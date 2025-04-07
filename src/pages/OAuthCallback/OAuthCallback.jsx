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
  const fromPage = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (token) {
      handleAuthSuccess({ token }, login)
    } else {
      navigate(fromPage, { replace: true });
      return
    }
  }, [token])

  useEffect(() => {
    if (isAuth && data) {
      login(data)
      navigate(fromPage, { replace: true });
    }
  }, [data, isAuth])


  return (
    <Page isBreadcrumbs={false}>
      <div className={`fixed w-full h-full inset-0 bg-[rgba(0,0,0,0.35)]`}>
        <Loader width={80} height={80} color="red" borderWidth='7px' />
      </div>
    </Page>
  )
}

export default OAuthCallback