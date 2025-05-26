import { create } from "zustand";
import Cookies from 'js-cookie';

export const useUserStore = create((set, get) => ({
  isAuth: !!Cookies.get('token'),
  user: {},
  basket: [],
  favorites: [],
  orders: [],
  selectProducts: [],
  pendingProduct: null,
  login: ({ user = {}, basket = [], favorites = [], orders = [] }) => set({
    isAuth: true,
    user,
    basket,
    favorites,
    orders,
    selectProducts: basket,
  }),
  logout: () => set({
    isAuth: false,
    user: {},
    basket: [],
    favorites: [],
    orders: [],
    selectProducts: [],
  }),
  checkProductInBasket: (productId) => get().basket.find(product => product.id === productId),
  checkProductInFavorites: (productId) => get().favorites.find(product => product.id === productId),
  addToBasket: (product) => set(state => {
    const index = state.basket.findIndex(item => item.id === product.id);
    let updatedBasket = [...state.basket]
    let updatedSelectProducts = [...state.selectProducts]

    if (index !== -1) {
      updatedBasket[index] = { ...product, totalPrice: product.price * product.quantity };
    } else {
      updatedBasket.push({ ...product, totalPrice: product.price, quantity: 1 })
    }

    if (updatedSelectProducts.length > 1) {
      updatedSelectProducts = updatedSelectProducts.map(product => {
        const productInBasket = updatedBasket.find(p => p.id === product.id) || {}
        return { ...product, ...productInBasket }
      })
    } else {
      updatedSelectProducts = updatedBasket
    }

    return { basket: updatedBasket, selectProducts: updatedSelectProducts };
  }),
  deleteFromBasket: (productIds) => set(state => {
    const updatedBasket = state.basket.filter(item => !productIds.includes(item.id));
    return { basket: updatedBasket, selectProducts: [], };
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
  setSelectProducts: (selectProducts) => set({ selectProducts }),
  updatedPendingProduct: (product) => set({ pendingProduct: product }),
  setOrders: (orders) => set({ orders }),
  addToOrders: (order) => set(state => ({ orders: [...state.orders, order] })),
}));