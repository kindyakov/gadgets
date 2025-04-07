import Cookies from 'js-cookie';

export const handleAuthSuccess = ({ token, user = {}, basket = [], favorites = [] }, login) => {
  if (!token) return;
  Cookies.set('token', `Bearer ${token}`, { expires: 1 });
  login({ user, basket, favorites });
};

export const checkAuth = () => {
  const token = Cookies.get('token');
  if (token) {
    let user = []
    let basket = []
    let favorites = []

    return { isAuth: true, user, basket, favorites };
  } else {
    return { isAuth: false, user: {}, basket: [], favorites: [] };
  }
};