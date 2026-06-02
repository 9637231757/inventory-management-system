from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.customer import Customer
from app.models.product import Product
from app.models.order import Order
from app.models.order_item import OrderItem

from app.schemas.order import OrderCreate

router = APIRouter()


@router.post("/orders")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):

    try:

        customer = (
            db.query(Customer)
            .filter(Customer.id == order.customer_id)
            .first()
        )

        if not customer:
            raise HTTPException(
                status_code=404,
                detail="Customer not found"
            )

        total_amount = 0

        for item in order.items:

            product = (
                db.query(Product)
                .filter(Product.id == item.product_id)
                .first()
            )

            if not product:
                raise HTTPException(
                    status_code=404,
                    detail=f"Product {item.product_id} not found"
                )

            if product.stock_quantity < item.quantity:
                raise HTTPException(
                    status_code=400,
                    detail=f"Insufficient stock for {product.name}"
                )

            total_amount += float(product.price) * item.quantity

        db_order = Order(
            customer_id=order.customer_id,
            total_amount=total_amount
        )

        db.add(db_order)

        db.flush()

        for item in order.items:

            product = (
                db.query(Product)
                .filter(Product.id == item.product_id)
                .first()
            )

            product.stock_quantity -= item.quantity

            order_item = OrderItem(
                order_id=db_order.id,
                product_id=product.id,
                quantity=item.quantity,
                price=product.price
            )

            db.add(order_item)

        db.commit()

        db.refresh(db_order)

        return {
            "order_id": db_order.id,
            "total_amount": total_amount,
            "message": "Order created successfully"
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/orders")
def get_orders(
    db: Session = Depends(get_db)
):
    orders = db.query(Order).all()

    return orders


@router.get("/orders/{order_id}")
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order