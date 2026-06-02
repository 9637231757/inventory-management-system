import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: 1,
  });

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    try {
      const payload = {
        customer_id: Number(formData.customer_id),
        items: [
          {
            product_id: Number(formData.product_id),
            quantity: Number(formData.quantity),
          },
        ],
      };

      const response = await api.post(
        "/orders",
        payload
      );

      alert(response.data.message);

      setFormData({
        customer_id: "",
        product_id: "",
        quantity: 1,
      });

      fetchOrders();
      fetchProducts();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.detail);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Orders</h1>

      <select
        value={formData.customer_id}
        onChange={(e) =>
          setFormData({
            ...formData,
            customer_id: e.target.value,
          })
        }
      >
        <option value="">
          Select Customer
        </option>

        {customers.map((customer) => (
          <option
            key={customer.id}
            value={customer.id}
          >
            {customer.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <select
        value={formData.product_id}
        onChange={(e) =>
          setFormData({
            ...formData,
            product_id: e.target.value,
          })
        }
      >
        <option value="">
          Select Product
        </option>

        {products.map((product) => (
          <option
            key={product.id}
            value={product.id}
          >
            {product.name} (Stock:
            {product.stock_quantity})
          </option>
        ))}
      </select>

      <br />
      <br />

      <input
        type="number"
        min="1"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={(e) =>
          setFormData({
            ...formData,
            quantity: e.target.value,
          })
        }
      />

      <br />
      <br />

      <button onClick={createOrder}>
        Create Order
      </button>

      <hr />

      <h2>Orders List</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>Order #{order.id}</h3>

          <p>
            Customer ID:{" "}
            {order.customer_id}
          </p>

          <p>
            Total Amount: ₹
            {order.total_amount}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;