import Page from "../Page"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../store/useUserStore"

const Account = () => {
  const navigate = useNavigate()
  const { isAuth } = useUserStore()

  if (!isAuth) {
    navigate('/')
  }

  return (
    <Page>
      Account
    </Page>
  )
}

export default Account