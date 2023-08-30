import axios from "axios"

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`,
  withCredentials: true,
})
