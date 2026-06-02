from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.customer import Customer
from app.schemas.customer import CustomerCreate

router = APIRouter()


@router.post("/customers")
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):

    existing_customer = (
        db.query(Customer)
        .filter(Customer.email == customer.email)
        .first()
    )

    if existing_customer:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    db_customer = Customer(
        name=customer.name,
        email=customer.email,
        phone=customer.phone
    )

    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)

    return db_customer


@router.get("/customers")
def get_customers(
    db: Session = Depends(get_db)
):
    customers = db.query(Customer).all()

    return customers