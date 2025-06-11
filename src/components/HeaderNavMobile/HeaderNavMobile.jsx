import { Link } from "react-router-dom"
import { useModalStore } from "../../store/useModalStore"
import { useUserStore } from "../../store/useUserStore"

import { FavoriteSvg } from '../../ui/svg/FavoriteSvg'
import { ComparisonSvg } from '../../ui/svg/ComparisonSvg'
import { AccountSvg } from '../../ui/svg/AccountSvg'
import { CatalogSvg } from '../../ui/svg/CatalogSvg'
import { HomeSvg } from '../../ui/svg/HomeSvg'

const HeaderNavMobile = () => {
  const openModal = useModalStore(s => s.openModal)
  const isAuth = useUserStore(s => s.isAuth)

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
  )
}

export default HeaderNavMobile