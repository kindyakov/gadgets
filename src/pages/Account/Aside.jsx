import { Link } from "react-router-dom"

import { FavoriteSvg } from "../../ui/svg/FavoriteSvg"
import { ComparisonSvg } from "../../ui/svg/ComparisonSvg"
import { BasketSvg } from "../../ui/svg/BasketSvg"

const maps = [
  { path: "/account", component: '', title: "Личный кабинет" },
  { path: "/account/profile", component: '', title: "Личные данные" },
  { path: "/account/basket", component: BasketSvg },
  { path: "/account/favorites", component: FavoriteSvg },
  { path: "/account/orders", component: ComparisonSvg },
  { path: "/account/settings", component: ComparisonSvg },
]

const Aside = () => {
  return (
    <aside className="w-1/4 flex flex-col gap-4">
      <Link to="/account">Личный кабинет</Link>
      <Link to="/account/profile">Личный данные</Link>
      <Link to="/account/basket">Корзина</Link>
      <Link to="/account/favorites">Избранные</Link>
      <Link to="/account/orders">Заказы</Link>
      <Link to="/account/comparison">Сравнение</Link>
      <Link to="/account/comparison">Настройки</Link>
      <BasketSvg />
    </aside>
  )
}

export default Aside