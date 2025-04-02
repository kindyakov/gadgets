import { AccountSvg } from '../../ui/svg/AccountSvg'
import { ProfileSvg } from '../../ui/svg/ProfileSvg';
import { BasketSvg } from "../../ui/svg/BasketSvg";
import { FavoriteSvg } from "../../ui/svg/FavoriteSvg";
import { ComparisonSvg } from "../../ui/svg/ComparisonSvg";
import { OrdersSvg } from "../../ui/svg/OrdersSvg";
import { SettingsSvg } from "../../ui/svg/SettingsSvg";
import { ExitSvg } from "../../ui/svg/ExitSvg";

import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";

const routes = [
  {
    path: '/account',
    title: 'Личный кабинет',
    icon: AccountSvg,
  },
  {
    path: '/account/profile',
    title: 'Данные',
    icon: MdOutlineAccountCircle,
  },
  {
    path: '/account/basket',
    title: 'Корзина',
    icon: BasketSvg,
  },
  {
    path: '/account/favorites',
    title: 'Избранные',
    icon: FavoriteSvg,
  },
  {
    path: '/account/orders',
    title: 'Заказы',
    icon: OrdersSvg,
  },
  {
    path: '/account/comparison',
    title: 'Сравнение',
    icon: ComparisonSvg,
  },
  {
    path: '/account/settings',
    title: 'Настройки',
    icon: IoSettingsOutline,
  },
  {
    path: '/',
    title: 'Выйти',
    icon: IoMdExit,
  }
]

export default routes;