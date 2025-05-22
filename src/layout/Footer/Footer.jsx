import { Link } from "react-router-dom"
import { useCategories } from '../../hooks/useCategories'
import { LogoSvg } from '../../ui/svg/LogoSvg'
import { VkSvg } from "../../ui/svg/VkSvg"
import { TtSvg } from "../../ui/svg/TtSvg"
import { InstSvg } from "../../ui/svg/InstSvg"
import { TgSvg } from "../../ui/svg/TgSvg"
import { YouTubeSvg } from "../../ui/svg/YouTubeSvg"
import './Footer.scss'

const Footer = () => {
  const { data } = useCategories()

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Лого" className="max-w-10" />
              <span className="text-[#0f1113] font-bold text-3xl font-verdana">RedTech</span>
            </Link>

            <p className="text-[#a1abb9] font-normal text-base">Мы в соц сетях</p>

            <ul className="footer__messages flex flex-wrap gap-2 items-center">
              <li>
                <a href="#" className="vk-link">
                  <VkSvg />
                </a>
              </li>
              <li>
                <a href="#" className="tt-link">
                  <TtSvg />
                </a>
              </li>
              <li>
                <a href="#" className="inst-link">
                  <InstSvg />
                </a>
              </li>
              <li>
                <a href="#" className="tg-link">
                  <TgSvg />
                </a>
              </li>
              <li>
                <a href="#" className="youtube-link">
                  <YouTubeSvg />
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#a1abb9] font-normal text-base">Пользователю</p>
            <ul className="flex flex-col gap-4">
              <li>
                <Link className="text-[#263141] font-normal text-base hover:text-red-light transition-colors">Связаться с нами</Link>
              </li>
              <li>
                <Link className="text-[#263141] font-normal text-base hover:text-red-light transition-colors">Поддержка пользователей</Link>
              </li>
              <li>
                <Link className="text-[#263141] font-normal text-base hover:text-red-light transition-colors">FAQ & Руководства</Link>
              </li>
              <li>
                <Link className="text-[#263141] font-normal text-base hover:text-red-light transition-colors">Политика конфиденциальности</Link>
              </li>
              <li>
                <Link className="text-[#263141] font-normal text-base hover:text-red-light transition-colors">Пользовательское соглашение</Link>
              </li>
            </ul>


          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#a1abb9] font-normal text-base">Популярные категории</p>
            <ul className="flex flex-col gap-4">
              {data?.length && data.map(category => (
                <li key={category.id}>
                  <Link to={`/catalog/${category.slug}`} className="text-[#263141] font-normal text-base hover:text-red-light transition-colors">{category.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#a1abb9] font-normal text-base">Команда RedTech</p>
            <ul className="flex flex-col gap-4">
              <li>
                <Link to={'/about'} className="text-[#263141] font-normal text-base hover:text-red-light transition-colors">О нас</Link>
              </li>
              <li>
                <Link to={'/vacations'} className="text-[#263141] font-normal text-base hover:text-red-light transition-colors">Работа у нас</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-6 border-t border-[#eceeef] border-solid mt-3">
          <p className="text-[#a1abb9] font-normal text-base">Copyright © 2023 RedTech, Inc. Все права защищены</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer