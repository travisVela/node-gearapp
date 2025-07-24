import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import toast from "react-hot-toast";

export const useGearStore = create((set, get) => ({
    user: null,
    gear: [],
    loading: false,
    checkingAuth: false,

    getGear: async () => {
        set({loading: true})
        try {
            const res = await axiosInstance.get('/get-gear')
            set({gear: res.data.auth_gear, loading: false})

        } catch (error) {
            set({loading: false})
            console.log(error.response)
            toast.error(error?.response?.data?.message || "error getting gear")
        }
    },
    addGear: async (type, brand, model, serial_number, year, description) => {
        console.log(type, brand, model, serial_number, year, description)
        set({loading: true})
        try{
            const res = await axiosInstance.post("/add-gear", {type, brand, model, serial_number, year, description})
            console.log(res.body)
        } catch (error) {
            set({loading: false})
            console.log(error?.response)
            toast.error(error?.response?.data?.message || "error adding gear")
        }

    }


}))