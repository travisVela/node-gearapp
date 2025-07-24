import {create} from "zustand";
import {axiosInstance} from '../lib/axios.js'
import toast from "react-hot-toast";

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: false,

    signup: async ({email, username, password, confirmPassword, firstname, lastname, bio}) => {
        set({loading: true})
        if (password !== confirmPassword) {
            set({loading: false})
            return toast.error("Passwords do not match")
        }
        try {
            const res = await axiosInstance.post("/auth/signup", {email, username, password, firstname, lastname, bio})
            set({user: res.data, loading:false} )
            toast.success("Account created successfully")

        } catch (error) {
            set({loading: false})
            // console.log(error.response.data.message)
            toast.error( error.response.data.message || "error signing up")
        }
    },
    login: async (email, password) => {
        set({loading: true})
        try {
            const res = await axiosInstance.post('/auth/login', {email, password})
            // console.log(res)
            toast.success("Logged in successfully")
            set({user: res.data, loading:false} )
        } catch (error) {
            set({loading: false})
            // console.log(error.response.data.message)
            toast.error(error.response.data.message || "error logging in")
        }
    },
    checkAuth: async () => {
        set({checkingAuth: true})
        try {
            const res = await axiosInstance.get("/auth/profile")
            set({user: res.data, checkingAuth: false})

        } catch (error) {
            set({checkingAuth: false, user: null})
            console.log(error.response.data.message)
            toast.error(error.response.data.message || "error checking auth")
        }
    },
    logout: async () => {
        try {
            set({user: null})
            await axiosInstance.post("/auth/logout")
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error?.response?.data?.message || "error checking auth")
        }
    }
}))