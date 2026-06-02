import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    stock_quantity: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async () => {
    try {
      await api.post("/products", {
        sku: formData.sku,
        name: formData.name,
        price: Number(formData.price),
        stock_quantity: Number(formData.stock_quantity),
      });

      setFormData({
        sku: "",
        name: "",
        price: "",
        stock_quantity: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <input
        placeholder="SKU"
        value={formData.sku}
        onChange={(e) =>
          setFormData({
            ...formData,
            sku: e.target.value,
          })
        }
      />

      <br /><br />

      <input
        placeholder="Product Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
      />

      <br /><br />

      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) =>
          setFormData({
            ...formData,
            price: e.target.value,
          })
        }
      />

      <br /><br />

      <input
        type="number"
        placeholder="Stock Quantity"
        value={formData.stock_quantity}
        onChange={(e) =>
          setFormData({
            ...formData,
            stock_quantity: e.target.value,
          })
        }
      />

      <br /><br />

      <button onClick={createProduct}>
        Create Product
      </button>

      <hr />

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{product.name}</h3>

          <p>SKU: {product.sku}</p>

          <p>Price: ₹{product.price}</p>

          <p>Stock: {product.stock_quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;