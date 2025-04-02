import { Link, useLocation, useNavigate } from "react-router-dom"
import accountRoutes from './account.routes.js';
import { useUserStore } from "../../store/useUserStore.js";
import { handleLogout } from "../../helpers/logoutHelpers.js";

const Aside = ({ slug }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useUserStore()

  const handleClickTab = (e, route) => {
    if (route.path === '/') {
      e.preventDefault()
      handleLogout(logout, navigate)
    }
  }

  return (
    <aside className="w-1/4 flex flex-col gap-2">
      {accountRoutes.map((route, index) => (
        <Link key={index} to={route.path}
          className={`flex items-center gap-4 p-3 rounded-md transition-colors border-[1px] border-solid border-[#dbdbdb]  ${route.path === location.pathname ? 'bg-red-light text-white' : 'hover:border-[#FF4D4D] hover:text-red-light'}`}
          onClick={(e) => handleClickTab(e, route)}>
          <route.icon style={{ width: '30px', height: '30px' }} />
          <span>{route.title}</span>
        </Link>
      ))}
    </aside>
  )
}

export default Aside