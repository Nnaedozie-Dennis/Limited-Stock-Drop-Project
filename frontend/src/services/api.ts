import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://aether-backend-tsct.onrender.com/api",
});
