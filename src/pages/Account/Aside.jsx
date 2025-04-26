import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import accountRoutes from './account.routes.js';
import { useUserStore } from "../../store/useUserStore.js";
import { handleLogout } from "../../helpers/logoutHelpers.js";

const Aside = ({ slug }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, basket, favorites } = useUserStore()
  const [isOpen, setIsOpen] = useState(true)

  const handleClickTab = (e, route) => {
    if (route.path === '/') {
      e.preventDefault()
      handleLogout(logout, navigate)
    }
  }

  const countSpan = {
    '/account/basket': () => {
      return basket.length ? (
        <span className={`transition-all flex items-center justify-center text-center rounded-full flex-shrink-0 bg-yellow-light text-white ${isOpen ? 'text-base w-6 h-6' : 'absolute top-0 right-0 text-xs w-4 h-4 translate-x-1/2 -translate-y-1/2'}`}>
          {basket.length}
        </span>
      ) : ''
    },
    '/account/favorites': () => {
      return favorites.length ? (
        <span className={`transition-all flex items-center justify-center text-center rounded-full flex-shrink-0 bg-yellow-light text-white ${isOpen ? 'text-base w-6 h-6' : 'absolute top-0 right-0 text-xs w-4 h-4 translate-x-1/2 -translate-y-1/2'}`}>
          {favorites.length}
        </span>
      ) : ''
    },
  }

  return (
    <aside className={`${isOpen ? 'w-1/5' : 'w-14'}  transition-all flex-shrink-0`}>
      <div className="flex flex-col gap-2">
        {accountRoutes.map((route, index) => (
          <Link key={index} to={route.path}
            className={`p-3 rounded-md transition-colors border-[1px] border-solid border-[#dbdbdb] relative text-nowrap flex items-center justify-between
            ${route.path === location.pathname ? 'bg-red-light text-white' : 'hover:border-[#FF4D4D] hover:text-red-light'}`}
            onClick={(e) => handleClickTab(e, route)}>
            <div className="overflow-hidden relative w-full h-full flex items-center gap-4">
              <route.icon style={{ width: '30px', height: '30px', flexShrink: 0 }} />
              <span>{route.title}</span>
            </div>
            {countSpan[route.path] ? countSpan[route.path]() : ''}
          </Link>
        ))
        }

        <button onClick={() => setIsOpen(prev => !prev)}>|'/-\'|</button>
      </div>
    </aside>
  )
}

export default Aside