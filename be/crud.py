from sqlalchemy.orm import Session
import models, schemas
from passlib.context import CryptContext
from sqlalchemy.orm import joinedload

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        password=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name,
        phone=user.phone,
        address=user.address,
        role_id=user.role_id,
        preferred_payment_method=user.preferred_payment_method
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return False
    if not pwd_context.verify(password, user.password):
        return False
    return user

def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not db_user:
        return None

    update_data = user_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user

def get_products(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Product).offset(skip).limit(limit).all()

def get_product_by_id(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.product_id == product_id).first()

def get_products_by_category_id(db: Session, category_id: int, skip: int = 0, limit: int = 10):
    return db.query(models.Product).filter(models.Product.category_id == category_id).offset(skip).limit(limit).all()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(
        name=product.name,
        price=product.price,
        stock_quantity=product.stock_quantity,
        category=product.category,
        image_url=product.image_url,
        category_id=product.category_id
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, product_id: int, product_update: schemas.ProductUpdate):
    db_product = db.query(models.Product).filter(models.Product.product_id == product_id).first()
    if not db_product:
        return None

    update_data = product_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)

    db.commit()
    db.refresh(db_product)
    return db_product

def update_order_status(db: Session, order_id: int, status: str):
    db_order = db.query(models.Order).filter(models.Order.order_id == order_id).first()
    if not db_order:
        return None

    db_order.status = status

    db.commit()
    db.refresh(db_order)
    return db_order

def delete_product(db: Session, product_id: int):
    db_product = db.query(models.Product).filter(models.Product.product_id == product_id).first()
    if not db_product:
        return None
    db.delete(db_product)
    db.commit()
    return db_product

def create_order(db: Session, order: schemas.OrderCreate):
    db_order = models.Order(
        user_id=order.user_id,
        status=order.status,
        total_amount=order.total_amount,
        shipping_address=order.shipping_address,
        # payment_method=order.payment_method
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_orders(db: Session, user_id: int, skip: int = 0, limit: int = 10):
    return db.query(models.Order).filter(models.Order.user_id == user_id).offset(skip).limit(limit).all()

def get_all_orders(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Order).offset(skip).limit(limit).all()

# def get_orders_with_items(db: Session, user_id: int = None, skip: int = 0, limit: int = 10):
#     query = db.query(models.Order).options(joinedload(models.Order.order_items))
#     if user_id:
#         query = query.filter(models.Order.user_id == user_id)
#     return query.offset(skip).limit(limit).all()

# def get_all_orders_with_items(db: Session, skip: int = 0, limit: int = 10):
#     return db.query(models.Order).options(joinedload(models.Order.order_items)).offset(skip).limit(limit).all()

def get_orders_with_items_and_products(db: Session, user_id: int = None, skip: int = 0, limit: int = 10):
    query = db.query(models.Order).options(joinedload(models.Order.order_items).joinedload(models.OrderItem.product))
    if user_id:
        query = query.filter(models.Order.user_id == user_id)
    return query.offset(skip).limit(limit).all()

def get_all_orders_with_items_and_products(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Order).options(joinedload(models.Order.order_items).joinedload(models.OrderItem.product)).offset(skip).limit(limit).all()

def create_payment(db: Session, payment: schemas.PaymentCreate):
    db_payment = models.Payment(
        order_id=payment.order_id,
        payment_date=payment.payment_date,
        amount=payment.amount,
        payment_method=payment.payment_method,
        status=payment.status
    )
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

def get_reviews(db: Session, product_id: int, skip: int = 0, limit: int = 10):
    return db.query(models.Review).filter(models.Review.product_id == product_id).offset(skip).limit(limit).all()

def create_review(db: Session, review: schemas.ReviewCreate):
    db_review = models.Review(
        product_id=review.product_id,
        user_id=review.user_id,
        rating=review.rating,
        comment=review.comment
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

def get_categories(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Category).offset(skip).limit(limit).all()

def create_category(db: Session, category: schemas.CategoryCreate):
    db_category = models.Category(
        name=category.name,
        description=category.description,
        column_4=category.column_4
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def update_category(db: Session, category_id: int, category_update: schemas.CategoryUpdate):
    db_category = db.query(models.Category).filter(models.Category.category_id == category_id).first()
    if not db_category:
        return None

    update_data = category_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_category, key, value)

    db.commit()
    db.refresh(db_category)
    return db_category

def delete_category(db: Session, category_id: int):
    db_category = db.query(models.Category).filter(models.Category.category_id == category_id).first()
    if not db_category:
        return None
    db.delete(db_category)
    db.commit()
    return db_category

def get_roles(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Role).offset(skip).limit(limit).all()

def create_role(db: Session, role: schemas.RoleCreate):
    db_role = models.Role(
        role_name=role.role_name,
        description=role.description
    )
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role
