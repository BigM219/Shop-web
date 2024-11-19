
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, DECIMAL, Text, NVARCHAR
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    email = Column(String, unique=True, index=True)
    first_name = Column(String, default='')
    last_name = Column(String, default='')
    phone = Column(String, default='')
    address = Column(Text,default='')
    role_id = Column(Integer, ForeignKey('roles.role_id'), default=1)
    created_at = Column(DateTime, default=datetime.utcnow)
    preferred_payment_method = Column(String, default=None)
    is_active: Column[Integer] = 1

    role = relationship("Role")
    orders = relationship("Order", back_populates="owner")
    reviews = relationship("Review", back_populates="user")

class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(DECIMAL(20, 2))
    stock_quantity = Column(Integer)
    category = Column(String)
    image_url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    category_id = Column(Integer, ForeignKey('categories.category_id'))

    category_rel = relationship("Category")
    reviews = relationship("Review", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")

class Order(Base):
    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    order_date = Column(DateTime, default=datetime.utcnow)
    status = Column(NVARCHAR(255))
    total_amount = Column(DECIMAL(20, 2))
    shipping_address = Column(Text)
    payment_method = Column(String)

    owner = relationship("User", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order")
    payments = relationship("Payment", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"

    order_item_id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey('orders.order_id'))
    product_id = Column(Integer, ForeignKey('products.product_id'))
    quantity = Column(Integer)
    unit_price = Column(DECIMAL(20, 2))

    order = relationship("Order", back_populates="order_items")
    product = relationship("Product", back_populates="order_items")

class Payment(Base):
    __tablename__ = "payments"

    payment_id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey('orders.order_id'))
    payment_date = Column(DateTime, default=datetime.utcnow)
    amount = Column(DECIMAL(20, 2))
    payment_method = Column(String)
    status = Column(String)

    order = relationship("Order", back_populates="payments")

class Review(Base):
    __tablename__ = "reviews"

    review_id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey('products.product_id'))
    user_id = Column(Integer, ForeignKey('users.user_id'))
    rating = Column(Integer)
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="reviews")
    product = relationship("Product", back_populates="reviews")

class Category(Base):
    __tablename__ = "categories"

    category_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(Text)
    column_4 = Column(Integer)

    products = relationship("Product", back_populates="category_rel")

class Role(Base):
    __tablename__ = "roles"

    role_id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String)
    description = Column(Text)

    users = relationship("User", back_populates="role")
