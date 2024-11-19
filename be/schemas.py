
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str
    user: Optional["User"]

class AdminToken(BaseModel):
    access_token: str
    token_type: str
    admin: Optional["User"]

class TokenData(BaseModel):
    username: Optional[str] = None

class UserBase(BaseModel):
    username: str
    email: str
    is_active: Optional[int] = 1

class UserCreate(UserBase):
    password: str
    first_name: str = ""
    last_name: str = ""
    phone: str = ""
    address: str = ""
    role_id: int = 1
    preferred_payment_method: str = ""

class UserUpdate(BaseModel):
    # email: str
    first_name: str = ""
    last_name: str = ""
    phone: str = ""
    address: str = ""
    # preferred_payment_method: Optional[str] = ""

class User(UserBase):
    user_id: int
    first_name: str
    last_name: str
    phone: str
    address: str
    role_id: int
    created_at: datetime
    preferred_payment_method: str

    class Config:
        orm_mode = True

class ProductBase(BaseModel):
    name: str
    price: float
    stock_quantity: int
    category: str
    image_url: str

class ProductCreate(ProductBase):
    category_id: int

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    stock_quantity: Optional[int] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    category_id: Optional[int] = None

    class Config:
        orm_mode = True

class Product(ProductBase):
    product_id: int
    created_at: datetime
    category_id: int

    class Config:
        orm_mode = True

class OrderBase(BaseModel):
    user_id: int
    status: str
    total_amount: float
    shipping_address: str
    # payment_method: str

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    total_amount: Optional[float] = None
    shipping_address: Optional[str] = None
    payment_method: Optional[str] = None

    class Config:
        orm_mode = True

class Order(OrderBase):
    order_id: int
    order_date: datetime

    class Config:
        orm_mode = True

class OrderItemBase(BaseModel):
    order_id: int
    product_id: int
    quantity: int
    unit_price: float

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int
    unit_price: float

class OrderCreate(OrderBase):
    order_items: List[OrderItemCreate] = []
    pass

class OrderStatusUpdate(BaseModel):
    status: str

    class Config:
        orm_mode = True
        
class OrderItem(OrderItemBase):
    order_item_id: int
    product: Product
    
    class Config:
        orm_mode = True

class OrderWithItems(Order):
    order_items: List[OrderItem]

    class Config:
        orm_mode = True
        
class PaymentBase(BaseModel):
    order_id: int
    payment_date: datetime
    amount: float
    payment_method: str
    status: str

class PaymentCreate(PaymentBase):
    pass

class Payment(PaymentBase):
    payment_id: int

    class Config:
        orm_mode = True

class ReviewBase(BaseModel):
    product_id: int
    user_id: int
    rating: int
    comment: str

class ReviewCreate(ReviewBase):
    pass

class Review(ReviewBase):
    review_id: int
    created_at: datetime

    class Config:
        orm_mode = True

class CategoryBase(BaseModel):
    name: str
    description: str
    column_4: int

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    column_4: Optional[int] = None

    class Config:
        orm_mode = True

class Category(CategoryBase):
    category_id: int

    class Config:
        orm_mode = True

class RoleBase(BaseModel):
    role_name: str
    description: str

class RoleCreate(RoleBase):
    pass

class Role(RoleBase):
    role_id: int

    class Config:
        orm_mode = True
