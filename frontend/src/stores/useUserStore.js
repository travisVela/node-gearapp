import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import ResetPassword from "../pages/ResetPassword.jsx";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: false,
  usernameData: null,
  error: null,
  message: null,

  signup: async ({
    email,
    username,
    password,
    confirmPassword,
    firstname,
    lastname,
    bio,
  }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }
    try {
      const res = await axiosInstance.post("/auth/signup", {
        email,
        username,
        password,
        firstname,
        lastname,
        bio,
      });
      console.log(res);
      set({ user: res.data, loading: false });
      toast.success("Account created successfully");
    } catch (error) {
      set({ loading: false });
      // console.log(error.response.data.message)
      toast.error(error.response.data.message || "error signing up");
    }
  },
  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      console.log(res);
      toast.success("Logged in successfully");
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      // console.log(error.response.data.message)
      toast.error(error.response.data.message || "error logging in");
    }
  },
  editProfile: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      toast.success(res.data.message || "success");
      set((state) => ({
        user: { ...state.user, ...data },
      }));
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      // console.log(error.response.data.message)
      toast.error(error.response.data.message || "error updating profile in");
    }
  },
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      console.log(error.response.data.message);
      // toast.error(error.response.data.message || "error checking auth")
    }
  },
  logout: async () => {
    console.log("clicked logout");
    try {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      set({ user: null });
      const res = await axiosInstance.post("/auth/logout");
      console.log(res);
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "error checking auth");
    }
  },
  refreshToken: async () => {
    if (get().checkingAuth) return;
    set({ checkingAuth: true });
    try {
      const res = await axiosInstance.post("/auth/refresh-token");
      set({ checkinAuth: false });
      return res.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
  findUsername: async (newUsername) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/auth/check-username/${newUsername}`
      );
      set({ loading: false, usernameData: response.data });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      console.log(error.response.data.message);
      toast.error(error.response.data.message || "error checking auth");
    }
  },
  findEmail: async (email) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/auth/check-email/${email}`);
      set({ loading: false, emailData: response.data });
    } catch (error) {
      set({ checkingAuth: false });
      console.log(error.response.data.message);
      toast.error(error.response.data.message || "error checking auth");
    }
  },
  forgotPassword: async (email) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      console.log(res);
      toast.success("Email sent");
      set({ loading: false, message: response.data.message });
    } catch (error) {
      set({ loading: false });
      console.log(error);
      toast.error(error.response.data.message || "error logging in");
    }
  },
  resetPassword: async (token, password, confirmPassword) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post(`/auth/reset-password/${token}`, {
        password,
        confirmPassword,
      });
      console.log(res);
      toast.success(res.data.message);
      set({ message: res.data.message, loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false });
      toast.error(error?.response?.data?.message || "error resetting password");
    }
  },
}));

// Axios interceptor for token refresh
let refreshPromise = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // If a refresh is already in progress, wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
          return axiosInstance(originalRequest);
        }

        // Start a new refresh process
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or handle as needed
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
