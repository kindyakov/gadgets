import './Header.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useUserStore } from "../../store/useUserStore"
import { useModalStore } from "../../store/useModalStore"
import { handleLogout } from "../../helpers/logoutHelpers.js";

import HeaderCatalog from './HeaderCatalog'

import { LogoSvg } from '../../ui/svg/LogoSvg'
import { TriangleSvg } from '../../ui/svg/TriangleSvg'
import { SearchSvg } from '../../ui/svg/SearchSvg'
import { FavoriteSvg } from '../../ui/svg/FavoriteSvg'
import { ComparisonSvg } from '../../ui/svg/ComparisonSvg'
import { AccountSvg } from '../../ui/svg/AccountSvg'
import { CatalogSvg } from '../../ui/svg/CatalogSvg'
import { HomeSvg } from '../../ui/svg/HomeSvg'
import accountRoutes from '../../pages/Account/account.routes.js';

const Header = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();
  const navigate = useNavigate()
  const { isAuth, favorites, logout } = useUserStore()
  const { openModal } = useModalStore()

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    setIsCatalogOpen(false)
  }, [location])

  const handleClickAccount = (e) => {
    if (!isAuth) {
      e.preventDefault()
      openModal('modalAuth')
    }
  }

  const mobileMenu = [
    { to: '/', icon: <HomeSvg />, name: 'Главная' },
    { to: '/catalog', icon: <CatalogSvg />, name: 'Каталог' },
    { to: '/account/comparison', icon: <ComparisonSvg />, name: 'Сравнение' },
    { to: '/account/favorite', icon: <FavoriteSvg />, name: 'Избранное' },
    { to: '/account', icon: <AccountSvg />, name: 'Аккаунт', onClick: handleClickAccount },
  ]

  return (
    <>
      <header ref={headerRef} className="header relative z-20 border-b border-solid border-[#f2f5f9] bg-[#fdfdfd]">
        <div className="container">
          <div className="header__inner flex sm:flex-row flex-col w-full justify-between gap-3 xl:gap-5">
            <div className='flex items-center gap-3'>
              <Link to='/' className='header__logo flex items-center gap-3'>
                <LogoSvg />
                <span>Behoof</span>
              </Link>
              <p className='header__logo-text'>Лучшие цены<br />в интернет-магазинах </p>
            </div>
            <div className='flex flex-auto'>
              <Link to='/catalog' className={`header__button-catalog hidden sm:flex ${isCatalogOpen ? '_active' : ''}`}
                onMouseEnter={() => setIsCatalogOpen(true)}>
                <span className='hidden md:inline'>Каталог товаров</span>
                <TriangleSvg />
              </Link>
              <form className='header__form flex-auto relative'>
                <button type='submit' className='header__search-button absolute left-4 top-1/2 -translate-y-1/2'>
                  <SearchSvg />
                </button>
                <input type="search" name="search" className='header__search-input w-full h-full pl-12 pr-4 rounded-r-md transition-colors min-h-[50px]' placeholder='Поиск товаров' autoComplete='off' />
              </form>
            </div>
            <div className='sm:flex hidden items-center gap-3 xl:gap-4 '>
              <Link to='/account/favorites' className='header__link p-2 transition-colors flex-shrink-0 relative'>
                <FavoriteSvg />
                {favorites.length > 0
                  ? <span className='absolute top-0 right-0 text-xs flex items-center justify-center text-center rounded-full text-white w-4 h-4 bg-yellow-light translate-x-1/2 -translate-y-1/2'>{favorites.length}</span>
                  : null}
              </Link>
              <Link to='/account/comparison' className='header__link p-2 transition-colors flex-shrink-0'>
                <ComparisonSvg />
              </Link>
              <div className="relative group">
                <Link to='/account' className={`header__link p-2 transition-colors flex-shrink-0 ${isAuth ? 'bg-red-light' : ''}`} onClick={handleClickAccount}>
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
          </div>
        </div>
      </header>
      <HeaderCatalog
        isCatalogOpen={isCatalogOpen}
        setIsCatalogOpen={setIsCatalogOpen}
        headerHeight={headerHeight}
      />
      <nav className='header__mobile w-full fixed left-0 right-0 bottom-0 bg-[#fdfdfd] sm:hidden'>
        <ul className='header__mobile_list flex justify-center max-w-[375px] mx-auto'>
          {mobileMenu?.length && mobileMenu.map((item, index) => (
            <li key={index + item.to} className='flex-auto'>
              <Link to={item.to}
                className={`header__mobile_link font-normal p-2 flex flex-col justify-between h-full gap-1 items-center ${location.pathname === item.to ? 'active' : ''}`}
                onClick={item.onClick}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav >
    </>
  )
}

export default Header