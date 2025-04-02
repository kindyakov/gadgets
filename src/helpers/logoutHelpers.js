import Cookies from 'js-cookie';
import { STORAGE_KEYS } from '../constants/storageKeys';

export const handleLogout = (logout, navigate) => {
  Cookies.remove(STORAGE_KEYS.TOKEN);
  logout();

  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.BASKET);
  localStorage.removeItem(STORAGE_KEYS.FAVORITES);

  if (window.location.pathname.startsWith('/account')) {
    navigate('/');
  }
};