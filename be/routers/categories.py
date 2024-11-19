from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, schemas, database

router = APIRouter()

def get_current_admin_user(current_user: schemas.User = Depends(database.get_current_active_user)):
    if current_user.role_id != 0:
        raise HTTPException(status_code=403, detail="Not authorized")
    return current_user

@router.get("/", response_model=List[schemas.Category])
def read_categories(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    categories = crud.get_categories(db, skip=skip, limit=limit)
    return categories

@router.post("/", response_model=schemas.Category)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_admin_user)):
    return crud.create_category(db=db, category=category)

@router.put("/{category_id}", response_model=schemas.Category)
def update_category(category_id: int, category: schemas.CategoryUpdate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_admin_user)):
    updated_category = crud.update_category(db, category_id=category_id, category_update=category)
    if not updated_category:
        raise HTTPException(status_code=404, detail="Category not found")
    return updated_category

@router.delete("/{category_id}", response_model=schemas.Category)
def delete_category(category_id: int, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_admin_user)):
    deleted_category = crud.delete_category(db, category_id=category_id)
    if not deleted_category:
        raise HTTPException(status_code=404, detail="Category not found")
    return deleted_category
