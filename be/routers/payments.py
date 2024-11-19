
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, schemas, database

router = APIRouter()

@router.post("/", response_model=schemas.Payment)
def create_payment(payment: schemas.PaymentCreate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(database.get_current_active_user)):
    return crud.create_payment(db=db, payment=payment)

@router.get("/order/{order_id}", response_model=List[schemas.Payment])
def read_order_payments(order_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(database.get_current_active_user)):
    payments = crud.get_payments(db, order_id=order_id, skip=skip, limit=limit)
    if not payments:
        raise HTTPException(status_code=404, detail="Payments not found")
    return payments

@router.get("/", response_model=List[schemas.Payment])
def read_all_payments(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(database.get_current_active_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to view all payments")
    payments = crud.get_all_payments(db, skip=skip, limit=limit)
    return payments
