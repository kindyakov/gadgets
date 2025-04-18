import { create } from "zustand";
import Cookies from 'js-cookie';

export const useUserStore = create((set, get) => ({
  isAuth: !!Cookies.get('token'),
  user: {},
  basket: [],
  favorites: [],
  login: ({ user = {}, basket = [], favorites = [] }) => set({
    isAuth: true,
    user,
    basket,
    favorites
  }),
  logout: () => set({
    isAuth: false,
    user: {},
    basket: [],
    favorites: [],
  }),
  checkProductInBasket: (productId) => get().basket.find(product => product.id === productId),
  checkProductInFavorites: (productId) => get().favorites.find(product => product.id === productId),
  addToBasket: (product) => set(state => {
    const index = state.basket.findIndex(item => item.id === product.id);
    let updatedBasket = [...state.basket]

    if (index !== -1) {
      updatedBasket[index] = { ...product, totalPrice: product.price * product.quantity };
    } else {
      updatedBasket.push(product)
    }
    return { basket: updatedBasket };
  }),
  removeFromBasket: (productId) => set(state => {
    const updatedBasket = state.basket.filter(item => item.id !== productId);
    return { basket: updatedBasket };
  }),
  toggleFavorite: (product) => set(state => {
    const updatedFavorites = state.favorites.find(_product => _product.id === product.id)
      ? state.favorites.filter(_product => _product.id !== product.id)
      : [...state.favorites, product];
    return { favorites: updatedFavorites };
  }),
  updatedUser: (user) => set({ user }),
  updatedBasket: (basket) => set({ basket }),
  updatedFavorites: (favorites) => set({ favorites }),
}));