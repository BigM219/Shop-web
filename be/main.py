from fastapi import FastAPI
from database import engine, Base, database
from routers import users, products, orders, payments, reviews, categories, roles
from models import *  # Ensure models are imported so Base can find them
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(products.router, prefix="/products", tags=["products"])
app.include_router(orders.router, prefix="/orders", tags=["orders"])
# app.include_router(auth.router, tags=["auth"])
app.include_router(payments.router, prefix="/payments", tags=["payments"])
app.include_router(reviews.router, prefix="/reviews", tags=["reviews"])
app.include_router(categories.router, prefix="/categories", tags=["categories"])
app.include_router(roles.router, prefix="/roles", tags=["roles"])

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
