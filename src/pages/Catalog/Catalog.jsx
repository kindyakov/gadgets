import { useParams } from "react-router-dom"
import Page from "../Page"
import CatalogPage from "./CatalogPage/CatalogPage"
import CategoryPage from "./CategoryPage/CategoryPage"
import ProductPage from "./ProductPage/ProductPage"

const Catalog = () => {
  const { "*": slug } = useParams()
  const segments = slug.split("/").filter(segment => segment)

  const pages = {
    0: (props) => <CatalogPage {...props} />,
    1: (props) => <CategoryPage {...props} />,
    2: (props) => <CategoryPage {...props} />,
    3: (props) => <ProductPage {...props} />,
  }

  const PageComponent = pages[segments.length]

  return (
    <Page>
      {PageComponent ? (
        <PageComponent slug={slug} segments={segments} />
      ) : (
        <div className="text-red-dark">
          Неверный уровень вложенности URL
        </div>
      )}
    </Page>
  )
}

export default Catalog
