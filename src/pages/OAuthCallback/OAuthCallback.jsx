import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Page from "../Page"
import Loader from "../../components/Loader/Loader"
import { useProfile } from '../../hooks/useProfile'
import { useUserStore } from "../../store/useUserStore"
import { handleAuthSuccess } from "../../helpers/authHelpers"

const OAuthCallback = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const token = new URLSearchParams(location.search).get('token');
  const { login, isAuth, } = useUserStore()
  const { data, isLoading, error } = useProfile(isAuth)
  const pathname = sessionStorage.getItem('pathname') || '/'

  useEffect(() => {
    if (token) {
      handleAuthSuccess({ token }, login)
    } else {
      navigate(pathname, { replace: true });
      return
    }
  }, [token])

  useEffect(() => {
    if (isAuth && data) {
      login(data)
      navigate(pathname, { replace: true });
      sessionStorage.removeItem('pathname')
    }
  }, [data, isAuth])

  return (
    <Page isBreadcrumbs={false}>
      <div className={`fixed w-full h-full inset-0 bg-[rgba(0,0,0,0.15)]`}>
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col gap-3 items-center max-w-md w-full rounded-xl bg-[#fa9b9b] p-5">
          <h2 className="text-3xl font-bold text-center text-white">Выполняем вход<br />в ваш профиль!</h2>
          <Loader width={80} height={80} borderWidth='7px'
            className="relative inset-auto translate-x-0 translate-y-0" />
        </div>
      </div>
    </Page>
  )
}

export default OAuthCallback