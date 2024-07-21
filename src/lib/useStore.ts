import { create } from "zustand";
import { User } from "./types.ts";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

const useStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useStore;