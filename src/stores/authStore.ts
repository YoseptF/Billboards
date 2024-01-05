import { combine } from "zustand/middleware";
import { create } from "zustand";

const authStore = create(
  combine(
    {
      isLoggedIn: false,
      isAdmin: false
    },
    (set) => ({
      logIn: () => set((state) => ({ isLoggedIn: true })),
    })
  ),
);

export default authStore;
