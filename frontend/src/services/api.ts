import axios from "axios";
import { supabase } from "../lib/supabase";

export const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://aether-backend-tsct.onrender.com/api",
});

api.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

   const token = session?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
