from pydantic import BaseModel
from decimal import Decimal


class ProductCreate(BaseModel):
    sku: str
    name: str
    price: Decimal
    stock_quantity: int