import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';

import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import About from './pages/About/About'
import Search from './pages/Search/Search'
import Game from './pages/Game/Game'
import Account from './pages/Account/Account'
import Feedback from './pages/Feedback/Feedback'
import Basket from './pages/Basket/Basket'
import Faq from './pages/Faq/Faq'
import Catalog from './pages/Catalog/Catalog'
import Reviews from './pages/Reviews/Reviews'
import OAuthCallback from './pages/OAuthCallback/OAuthCallback'

import InitialModals from './InitialModals'
import { useProfile } from './hooks/useProfile';
import { useUserStore } from './store/useUserStore';

function App() {
  const [token] = useState(() => Cookies.get('token') || null);
  const { login, logout } = useUserStore()
  const { data, isLoading, error } = useProfile(!!token)
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      login(data)
    }

    if (error) {
      Cookies.remove('token')
      queryClient.invalidateQueries(['profile']); // Очистка кеши запросов при ошибке
      logout()
    }
  }, [data, error]);

  return (
    <>
      <Toaster />
      <InitialModals />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/game" element={<Game />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/catalog/*" element={<Catalog />} />
        <Route path="/reviews/*" element={<Reviews />} />
        <Route path="/auth-success" element={<OAuthCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
