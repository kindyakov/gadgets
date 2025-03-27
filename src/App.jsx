import { Routes, Route } from 'react-router-dom'
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
import Favorite from './pages/Favorite/Favorite'
import Comparison from './pages/Comparison/Comparison'
import Reviews from './pages/Reviews/Reviews'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/about" element={<About />} />
      <Route path="/search" element={<Search />} />
      <Route path="/game" element={<Game />} />
      <Route path="/account" element={<Account />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/catalog/*" element={<Catalog />} />
      <Route path="/reviews/*" element={<Reviews />} />
      <Route path="/favorites" element={<Favorite />} />
      <Route path="/comparison" element={<Comparison />} />
    </Routes>
  )
}

export default App
