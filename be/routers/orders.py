from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, schemas, database, models

router = APIRouter()

def get_current_admin_user(current_user: schemas.User = Depends(database.get_current_active_user)):
    if current_user.role_id != 2:
        raise HTTPException(status_code=403, detail="Not authorized")
    return current_user

@router.post("/", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(database.get_current_active_user)):
    if current_user.user_id != order.user_id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to create order for another user")
    
    # Tạo đơn hàng mới
    db_order = models.Order(
        user_id=order.user_id,
        status=order.status,
        total_amount=order.total_amount,
        shipping_address=order.shipping_address,
        # payment_method=order.payment_method,  # Bỏ comment dòng này nếu bạn muốn lưu phương thức thanh toán
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    # Tạo các mục đơn hàng
    for item in order.order_items:
        db_item = models.OrderItem(
            order_id=db_order.order_id,
            product_id=item.product_id,
            quantity=item.quantity,
            unit_price=item.unit_price
        )
        db.add(db_item)
    
    db.commit()  # Lưu tất cả các thay đổi vào cơ sở dữ liệu

    return db_order


@router.get("/user/{user_id}", response_model=List[schemas.OrderWithItems])
def read_user_orders(user_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(database.get_current_active_user)):
    if current_user.user_id != user_id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to view orders for another user")
    orders = crud.get_orders_with_items_and_products(db, user_id=user_id, skip=skip, limit=limit)
    if not orders:
        raise HTTPException(status_code=404, detail="Orders not found")
    return orders

@router.get("/", response_model=List[schemas.OrderWithItems])
def read_all_orders(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(database.get_current_active_user)):
    if current_user.role_id != 2:
        raise HTTPException(status_code=403, detail="Not authorized to view all orders")
    orders = crud.get_all_orders_with_items_and_products(db, skip=skip, limit=limit)
    return orders

@router.put("/{order_id}", response_model=schemas.Order)
def update_order(order_id: int, order: schemas.OrderUpdate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_admin_user)):
    updated_order = crud.update_order(db, order_id=order_id, order_update=order)
    if not updated_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return updated_order

@router.put("/{order_id}/status", response_model=schemas.Order)
def update_order_status(order_id: int, status_update: schemas.OrderStatusUpdate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_admin_user)):
    updated_order = crud.update_order_status(db, order_id=order_id, status=status_update.status)
    if not updated_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return updated_order

@router.delete("/{order_id}", response_model=schemas.Order)
def delete_order(order_id: int, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_admin_user)):
    deleted_order = crud.delete_order(db, order_id=order_id)
    if not deleted_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return deleted_order
