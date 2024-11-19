
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, schemas, database

router = APIRouter()

@router.post("/", response_model=schemas.Role)
def create_role(role: schemas.RoleCreate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(database.get_current_active_user)):
    return crud.create_role(db=db, role=role)

@router.get("/", response_model=List[schemas.Role])
def read_roles(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    roles = crud.get_roles(db, skip=skip, limit=limit)
    return roles
