import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_AWS_API
      : import.meta.env.VITE_AWS_API,
  withCredentials: true
});

// axiosInstance.interceptors.request.use((config) => {
//
//   const token = localStorage.getItem("jwt")
//   config.headers.Authorization = token ? `Bearer ${token}` : '';
//   return config
// }, error => {
//   return Promise.reject(error)
// })


