import { create } from "zustand";
import User from "./types.ts";

const initUser = 

const useStore = create( (set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useStore;