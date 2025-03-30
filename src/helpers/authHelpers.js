import Cookies from 'js-cookie';

export const handleAuthSuccess = ({ token, user, basket, favorites }, login) => {
  Cookies.set('token', `Bearer ${token}`, { expires: 1 });
  login({ user, basket, favorites });

  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('basket', JSON.stringify(basket));
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const checkAuth = () => {
  const token = Cookies.get('token');
  if (token) {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const basket = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [];
    const favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
    return { isAuth: true, user, basket, favorites };
  } else {
    return { isAuth: false, user: {}, basket: [], favorites: [] };
  }
};