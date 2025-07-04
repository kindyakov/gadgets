import './Header.scss'
import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import HeaderCatalog from '../../components/HeaderCatalog/HeaderCatalog'
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch';
import HeaderFormSearch from '../../components/HeaderFormSearch/HeaderFormSearch.jsx';

import { LogoSvg } from '../../ui/svg/LogoSvg'
import { TriangleSvg } from '../../ui/svg/TriangleSvg'

import HeaderIcons from '../../components/HeaderIcons/HeaderIcons.jsx';
import HeaderNavMobile from '../../components/HeaderNavMobile/HeaderNavMobile.jsx';

import { useHeaderStore } from '../../store/useHeaderStore.js';

const Header = () => {
  const { isCatalogOpen, isSearchOpen, setIsCatalogOpen, setIsSearchOpen, setHeaderHeight } = useHeaderStore()
  const headerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    setIsCatalogOpen(false)
    setIsSearchOpen(false)
  }, [location])

  return (
    <>
      <header ref={headerRef} className="header relative z-20 border-b border-solid border-[#f2f5f9] bg-[#fdfdfd]">
        <div className="container">
          <div className="header__inner flex sm:flex-row flex-col w-full justify-between gap-3 xl:gap-5">
            <div className='flex items-center gap-3'>
              <Link to='/' className='header__logo flex items-center gap-3'>
                <img src="/logo.png" alt="Лого" className='max-w-10' />
                <span>RedTech</span>
              </Link>
              <p className='header__logo-text'>Лучшие цены<br />в интернет-магазинах </p>
            </div>
            <div className='flex flex-auto'>
              <button className={`header__button-catalog hidden sm:flex ${isCatalogOpen ? '_active' : ''}`}
                onMouseEnter={() => {
                  setIsCatalogOpen(true)
                  setIsSearchOpen(false)
                }}
                onClick={() => {
                  setIsCatalogOpen(!isCatalogOpen)
                  setIsSearchOpen(false)
                }}>
                <span className='hidden md:inline'>Каталог товаров</span>
                <TriangleSvg />
              </button>
              <HeaderFormSearch />
            </div>
            <HeaderIcons />
          </div>
        </div>
      </header>

      <HeaderCatalog />
      <HeaderSearch />
      <HeaderNavMobile />

      <div className={`overlay ${isCatalogOpen || isSearchOpen ? '_active' : ''}`}></div>
    </>
  )
}

export default Header