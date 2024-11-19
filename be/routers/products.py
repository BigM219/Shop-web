from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, schemas, database

router = APIRouter()

def get_current_admin_user(current_user: schemas.User = Depends(database.get_current_active_user)):
    if current_user.role_id != 2:
        raise HTTPException(status_code=403, detail="Not authorized")
    return current_user

@router.get("/", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    products = crud.get_products(db, skip=skip, limit=limit)
    return products

@router.get("/{product_id}", response_model=schemas.Product)
def read_product_by_id(product_id: int, db: Session = Depends(database.get_db)):
    product = crud.get_product_by_id(db, product_id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/{category_id}", response_model=List[schemas.Product])
def read_products_by_category_id(category_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    products = crud.get_products_by_category_id(db, category_id=category_id, skip=skip, limit=limit)
    if not products:
        raise HTTPException(status_code=404, detail="No products found for this category")
    return products

@router.post("/", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_admin_user)):
    return crud.create_product(db=db, product=product)

@router.put("/{product_id}", response_model=schemas.Product)
def update_product(product_id: int, product: schemas.ProductUpdate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_admin_user)):
    updated_product = crud.update_product(db, product_id=product_id, product_update=product)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

@router.delete("/{product_id}", response_model=schemas.Product)
def delete_product(product_id: int, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_admin_user)):
    deleted_product = crud.delete_product(db, product_id=product_id)
    if not deleted_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return deleted_product