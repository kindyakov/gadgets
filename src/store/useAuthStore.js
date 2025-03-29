import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuth: false,
  user: {},
  cart: [],
  favorites: [],
  login: () => set({ isAuth: true }),
  logout: () => set({ isAuth: false }),
}));