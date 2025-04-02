import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

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

import InitialModals from './InitialModals'

function App() {
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
