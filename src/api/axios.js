import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "https://shoppingapp-on6o.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
