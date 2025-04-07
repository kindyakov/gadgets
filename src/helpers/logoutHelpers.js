import Cookies from 'js-cookie';

export const handleLogout = (logout, navigate) => {
  Cookies.remove('token');
  logout();

  if (location.pathname.startsWith('/account')) {
    navigate('/');
  }
};