import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUserStore } from "../../store/useUserStore"

import Page from "../Page"
import Favorite from './Favorite/Favorite'
import Comparison from './Comparison/Comparison'
import Basket from './Basket/Basket'
import Aside from "./Aside"
const Account = () => {
  const { "*": slug } = useParams()
  const navigate = useNavigate()
  const { isAuth } = useUserStore()

  const pages = {
    favorites: (props) => <Favorite {...props} />,
    comparison: (props) => <Comparison {...props} />,
    basket: (props) => <Basket {...props} />,
  }

  const PageComponent = pages[slug] || null

  useEffect(() => {
    if (!isAuth) {
      navigate('/')
    }
  }, [isAuth])

  return (
    <Page>
      <div className="flex gap-5 mt-5">
        <Aside />
        <div className="w-3/4">
          {PageComponent
            ? <PageComponent />
            : "Личный кабинет"}
        </div>
      </div>
    </Page>
  )
}

export default Account