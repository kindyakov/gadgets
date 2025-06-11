import { Link, useNavigate } from 'react-router-dom';
import { AccountSvg } from '../../ui/svg/AccountSvg'
import { FavoriteSvg } from '../../ui/svg/FavoriteSvg'
import { BasketSvg } from "../../ui/svg/BasketSvg";
import accountRoutes from '../../pages/Account/account.routes.js';
import { useUserStore } from '../../store/useUserStore.js';
import { useModalStore } from '../../store/useModalStore.js';
import { handleLogout } from "../../helpers/logoutHelpers.js";

const HeaderIcons = () => {
  const navigate = useNavigate()
  const { isAuth, favorites, basket, logout } = useUserStore()
  const openModal = useModalStore(s => s.openModal)

  const handleClickAccount = (e) => {
    if (!isAuth) {
      e.preventDefault()
      openModal('modalAuth')
    }
  }

  const spanCount = (count) => {
    return count > 0
      ? <span className='absolute top-0 right-0 text-xs flex items-center justify-center text-center rounded-full text-white w-4 h-4 bg-yellow-light translate-x-1/2 -translate-y-1/2'>{count}</span>
      : null
  }

  return (
    <div className='sm:flex hidden items-center gap-3 xl:gap-4 '>
      <Link
        to='/account/favorites'
        className='header__link p-2 transition-colors flex-shrink-0 relative'
        onClick={handleClickAccount}>
        <FavoriteSvg />
        {spanCount(favorites.length)}
      </Link>
      <Link
        to='/account/basket'
        className='header__link p-2 transition-colors flex-shrink-0'
        onClick={handleClickAccount}>
        {spanCount(basket.length)}
        <BasketSvg width='25px' />
      </Link>
      <div className="relative group">
        <Link
          to='/account'
          className={`header__link p-2 transition-colors flex-shrink-0 ${isAuth ? 'bg-red-light' : ''}`}
          onClick={handleClickAccount}>
          <AccountSvg color={isAuth ? '#fff' : '#263141'} />
        </Link>
        {isAuth
          ? (
            <ul
              className='absolute transition-opacity right-0 p-3 rounded-md flex flex-col bg-[#FFEDED] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible'
              style={{ top: 'calc(100% + 12px)' }}
            >
              <span className='absolute bottom-full right-0 left-0 w-full h-3'></span>
              {accountRoutes.map(route => (
                <li key={route.path}>
                  <Link to={route.path}
                    className='transition-colors flex items-center gap-2 px-2 py-1 text-nowrap hover:text-red-light'
                    onClick={e => {
                      if (route.path === '/') {
                        e.preventDefault()
                        handleLogout(logout, navigate)
                      }
                    }}>
                    {<route.icon style={{ width: '20px', height: '20px' }} />}
                    <span>{route.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )
          : ''}
      </div>
    </div>
  )
}

export default HeaderIcons