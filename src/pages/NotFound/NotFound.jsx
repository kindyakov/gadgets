import { Link } from "react-router-dom"
import Page from "../Page"
import { ArrowSvg } from "../../ui/svg/ArrowSvg"

const NotFound = () => {
  return (
    <Page isBreadcrumbs={false}>
      <div className="flex flex-col items-center justify-center gap-4 text-center pt-20">
        <h1 className="text-[80px] font-bold">Упс...</h1>
        <p className="text-[24px] font-semibold">Страница не найдена</p>
        <p className="text-[14px] font-regular">Тут что то упало и это не страшно!<br></br>
          Но мы все сохранили ;)</p>
        <Link to="/" className="button">
          <span>Перейти на главную</span>
          <ArrowSvg />
        </Link>
      </div>
    </Page>
  )
}

export default NotFound