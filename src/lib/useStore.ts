import { create } from "zustand";
import { User } from "./types.ts";

interface UserStore {
  globalUser: User | null;
  setGlobalUser: (globalUser: User) => void;
}

const useStore = create<UserStore>((set) => ({
  globalUser: null,
  setGlobalUser: (globalUser) => set({ globalUser }),
}));

export default useStore;