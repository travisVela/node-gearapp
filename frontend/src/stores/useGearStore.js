import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useGearStore = create((set, get) => ({
  user: null,
  gear: [],
  loading: false,
  checkingAuth: false,
  setIsloading: null,

  getGear: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/get-gear");
      set({ gear: res.data.auth_gear, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error.response);
      toast.error(error?.response?.data?.message || "error getting gear");
    }
  },
  addGear: async (data) => {
    const { gear } = get();

    set({ loading: true });
    try {
      const res = await axiosInstance.post("/add-gear", data);
      set({ gear: [...gear, res.data] });
    } catch (error) {
      set({ loading: false });
      console.log(error?.response);
      toast.error(error?.response?.data?.message || "error adding gear");
    }
  },
  deleteGear: async (id) => {
    set({ loading: true });

    try {
      await axiosInstance.delete(`/delete-gear/${id}`);
      set((state) => ({
        gear: state.gear.filter((item) => item._id !== id),
      }));
      toast.success("Item deleted");
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error?.response);
      toast.error(error?.response?.data?.message || "error deleting gear");
    }
  },
  updateGear: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.put("/update-gear", data);
      toast.success(res.data?.message || "update");

      set((state) => ({
        gear: state.gear.map((item) =>
          item._id === data._id ? { ...item, ...data } : item
        ),
      }));
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error?.response);
      toast.error(error?.response?.data?.message || "error deleting gear");
    }
  },
}));
