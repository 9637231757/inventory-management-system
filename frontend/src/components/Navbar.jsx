import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "15px",
        background: "#222",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link to="/" style={{ color: "white" }}>
        Products
      </Link>

      <Link to="/customers" style={{ color: "white" }}>
        Customers
      </Link>

      <Link to="/orders" style={{ color: "white" }}>
        Orders
      </Link>
    </nav>
  );
}

export default Navbar;