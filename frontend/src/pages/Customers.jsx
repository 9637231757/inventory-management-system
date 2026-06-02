import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers");

      console.log("Customers fetched:", response.data);

      setCustomers(response.data);
    } catch (error) {
      console.log("FETCH ERROR:", error);

      if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", error.response.data);
      }
    }
  };

  const createCustomer = async () => {
    console.log("Create Customer clicked");
    console.log("Form Data:", formData);

    try {
      const response = await api.post(
        "/customers",
        formData
      );

      console.log(
        "Customer created successfully:",
        response.data
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
      });

      fetchCustomers();
    } catch (error) {
      console.log("CREATE ERROR:", error);

      if (error.response) {
        console.log(
          "STATUS:",
          error.response.status
        );

        console.log(
          "DATA:",
          error.response.data
        );
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customers</h1>

      <input
        placeholder="Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) =>
          setFormData({
            ...formData,
            phone: e.target.value,
          })
        }
      />

      <br />
      <br />

      <button onClick={createCustomer}>
        Create Customer
      </button>

      <hr />

      <h2>Customer List</h2>

      {customers.length === 0 ? (
        <p>No customers found</p>
      ) : (
        customers.map((customer) => (
          <div
            key={customer.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{customer.name}</h3>

            <p>Email: {customer.email}</p>

            <p>Phone: {customer.phone}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Customers;