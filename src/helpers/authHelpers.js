import Cookies from 'js-cookie';
import { STORAGE_KEYS } from '../constants/storageKeys';

export const handleAuthSuccess = ({ token, user, basket, favorites }, login) => {
  if (!token) return;
  Cookies.set(STORAGE_KEYS.TOKEN, `Bearer ${token}`, { expires: 1 });
  login({ user, basket, favorites });

  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  localStorage.setItem(STORAGE_KEYS.BASKET, JSON.stringify(basket));
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
};

export const checkAuth = () => {
  const token = Cookies.get(STORAGE_KEYS.TOKEN);
  if (token) {
    const user = localStorage.getItem(STORAGE_KEYS.USER) ? JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) : {};
    const basket = localStorage.getItem(STORAGE_KEYS.BASKET) ? JSON.parse(localStorage.getItem(STORAGE_KEYS.BASKET)) : [];
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES) ? JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES)) : [];
    return { isAuth: true, user, basket, favorites };
  } else {
    return { isAuth: false, user: {}, basket: [], favorites: [] };
  }
};