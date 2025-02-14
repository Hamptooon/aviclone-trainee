// api/client.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAdvertisements = async () => {
  const response = await api.get("/items");
  return response.data;
};
