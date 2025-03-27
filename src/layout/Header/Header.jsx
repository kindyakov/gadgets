import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './Header.scss'

import { LogoSvg } from '../../ui/svg/LogoSvg'
import { TriangleSvg } from '../../ui/svg/TriangleSvg'
import { SearchSvg } from '../../ui/svg/SearchSvg'
import { FavoriteSvg } from '../../ui/svg/FavoriteSvg'
import { ComparisonSvg } from '../../ui/svg/ComparisonSvg'
import { AccountSvg } from '../../ui/svg/AccountSvg'
import { CatalogSvg } from '../../ui/svg/CatalogSvg'
import { HomeSvg } from '../../ui/svg/HomeSvg'
import HeaderCatalog from './HeaderCatalog'

const Header = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    setIsCatalogOpen(false)
  }, [location])

  const mobileMenu = [
    { to: '/', icon: <HomeSvg />, name: 'Главная' },
    { to: '/catalog', icon: <CatalogSvg />, name: 'Каталог' },
    { to: '/comparison', icon: <ComparisonSvg />, name: 'Сравнение' },
    { to: '/favorite', icon: <FavoriteSvg />, name: 'Избранное' },
    { to: '/account', icon: <AccountSvg />, name: 'Аккаунт' },
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
              <Link to='/favorites' className='header__link p-2 transition-colors flex-shrink-0'>
                <FavoriteSvg />
              </Link>
              <Link to='/comparison' className='header__link p-2 transition-colors flex-shrink-0'>
                <ComparisonSvg />
              </Link>
              <Link to='/account' className='header__link p-2 transition-colors flex-shrink-0'>
                <AccountSvg />
              </Link>
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
                className={`header__mobile_link font-normal p-2 flex flex-col justify-between h-full gap-1 items-center ${location.pathname === item.to ? 'active' : ''}`}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Header