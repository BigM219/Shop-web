
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, schemas, database

router = APIRouter()

@router.post("/", response_model=schemas.Review)
def create_review(review: schemas.ReviewCreate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(database.get_current_active_user)):
    return crud.create_review(db=db, review=review)

@router.get("/product/{product_id}", response_model=List[schemas.Review])
def read_product_reviews(product_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    reviews = crud.get_reviews(db, product_id=product_id, skip=skip, limit=limit)
    if not reviews:
        raise HTTPException(status_code=404, detail="Reviews not found")
    return reviews
