import axios from "axios"

// Keep API configuration in one place for when the mock data is replaced.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  timeout: 15_000,
})
