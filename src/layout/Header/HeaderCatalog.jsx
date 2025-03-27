import { useEffect, useState } from "react"
import { useCategories } from "../../hooks/useCategories";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useProducts } from "../../hooks/useProducts";
import { useBreadcrumbStore } from "../../store/useBreadcrumbStore.js";
import NavList from "./NavList";

const HeaderCatalog = ({ isCatalogOpen, setIsCatalogOpen, headerHeight }) => {
  const [category, setCategory] = useState({})
  const [subCategory, setSubCategory] = useState({})
  const { breadcrumbNames, setBreadcrumbName, updateBreadcrumbs } = useBreadcrumbStore()
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const { data: subCategories = [], isLoading: isLoadingSubCategories } = useSubCategories({ categoryId: category?.id });
  const { data: products = [], isLoading: isLoadingProducts } = useProducts({ subCategoryId: subCategory?.id });

  useEffect(() => {
    const DATA = [...categories, ...subCategories, ...products]
    const filteredData = DATA.filter(item => !breadcrumbNames[item.slug])

    filteredData.length && filteredData.forEach(item => {
      setBreadcrumbName(item.slug, item.title)
    })

  }, [categories, subCategories, products])

  function handleMouseEnterCategory(category) {
    setCategory(category)
    setSubCategory(null)
    setSubCategory(null)
  }

  function handleMouseEnterSubCategory(subCategory) {
    setSubCategory(subCategory)
  }

  return (
    <>
      <div className={`header__catalog absolute z-10 left-0 right-0 w-ful bg-[#fdfdfd] ${isCatalogOpen ? '_open' : ''}`}
        onMouseLeave={() => setIsCatalogOpen(false)}
        style={{ top: `${headerHeight + 1}px` }}
      >
        <div className="header__catalog_body bg-white">
          <div className='container'>
            <div className='header__catalog_wrapper py-5'>
              <div className="header__catalog_content grid grid-cols-3 lg:grid-cols-4 w-full gap-4">
                <NavList
                  title="Каталог товаров"
                  items={categories}
                  activeId={category?.id}
                  onMouseEnter={handleMouseEnterCategory}
                  baseUrl="/catalog"
                />
                {category?.id && (
                  <NavList
                    title={category?.title}
                    items={subCategories}
                    activeId={subCategory?.id}
                    onMouseEnter={handleMouseEnterSubCategory}
                    baseUrl={`/catalog/${category.slug}`}
                  />
                )}
                {subCategory?.id && (
                  <NavList
                    title={subCategory?.title}
                    items={products}
                    baseUrl={`/catalog/${category.slug}/${subCategory.slug}`}
                    isSvg={false}
                  />
                )}
                <div className="header__catalog_banner overflow-hidden col-start-4 hidden lg:flex">
                  <img src="" alt="banner" className="object-cover w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`overlay ${isCatalogOpen ? '_active' : ''}`}></div>
    </>
  )
}

export default HeaderCatalog
