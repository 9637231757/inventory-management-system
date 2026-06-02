import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-management-system-p7fx.onrender.com",
});

export default api;