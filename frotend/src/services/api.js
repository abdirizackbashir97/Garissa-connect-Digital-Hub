import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export async function getHealth() {
  const { data } = await client.get("/health");
  return data;
}

export async function getCategories() {
  const { data } = await client.get("/categories");
  return data;
}

export async function getCategory(id) {
  const { data } = await client.get(`/categories/${id}`);
  return data;
}

export async function getServices(filters = {}) {
  const params = {};
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      params[key] = value;
    }
  }
  const { data } = await client.get("/services", { params });
  return data;
}

export async function getService(id) {
  const { data } = await client.get(`/services/${id}`);
  return data;
}

export async function createService(payload) {
  const { data } = await client.post("/services", payload);
  return data;
}

export async function updateService(id, payload) {
  const { data } = await client.put(`/services/${id}`, payload);
  return data;
}

export async function deleteService(id) {
  const { data } = await client.delete(`/services/${id}`);
  return data;
}

export default client;
