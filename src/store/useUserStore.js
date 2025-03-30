import { create } from "zustand";
import { checkAuth } from "../helpers/authHelpers";

const initialAuth = checkAuth();

function updateLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const useUserStore = create((set, get) => ({
  isAuth: initialAuth.isAuth,
  user: initialAuth.user,
  basket: initialAuth.basket,
  favorites: initialAuth.favorites,
  login: ({ user = {}, basket = [], favorites = [] }) => set({
    isAuth: true,
    user,
    basket,
    favorites
  }),
  logout: () => set({
    isAuth: false, user: {},
    basket: [],
    favorites: [],
  }),
  checkProductInBasket: (productId) => get().basket.find(product => product.id === productId),
  addToBasket: (product) => set(state => {
    const updatedBasket = [...state.basket, product];
    updateLocalStorage("basket", updatedBasket)
    return { basket: updatedBasket };
  }),
  removeFromBasket: (productId) => set(state => {
    const updatedBasket = state.basket.filter(item => item.id !== productId);
    updateLocalStorage("basket", updatedBasket)
    return { basket: updatedBasket };
  }),
  toggleFavorite: (productId) => set(state => {
    const updatedFavorites = state.favorites.includes(productId)
      ? state.favorites.filter(id => id !== productId)
      : [...state.favorites, productId];
    updateLocalStorage("favorites", updatedFavorites)
    return { favorites: updatedFavorites };
  })
}));