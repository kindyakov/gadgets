import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";
import { useSubCategories } from "../../../hooks/useSubCategories";
import Loader from "./Loader";

const CatalogPage = () => {
  const { data: categories, isLoading: isLoadingCategories, isSuccess: isSuccessCategories } = useCategories()
  const { data: subCategories, isLoading: isLoadingSubCategories, isSuccess: isSuccessSubCategories } = useSubCategories()
  const [isLoaded, setIsLoaded] = useState(true)
  const [catalog, setCatalog] = useState([])

  useEffect(() => {
    setIsLoaded(isSuccessCategories && isSuccessSubCategories ? false : true)
    if (categories && subCategories) {
      setCatalog(categories.map(category => {
        category.subCategories = subCategories.filter(subCategory => +subCategory.categoryId === +category.id)
        return category
      }))
    }
  }, [isSuccessSubCategories, isSuccessCategories])

  return (
    <section id="catalog" className="py-6">
      <h1 className="text-[#26314] font-bold text-5xl">Каталог</h1>
      <div className="grid template-columns md:grid-cols-3 sm:grid-cols-2 gap-4  pt-5">
        {isLoaded && !catalog.length
          ? (
            <>
              <Loader />
              <Loader />
            </>
          )
          : catalog.map(category => (
            <div className="bg-[#f5f7fa] lg:py-[35px] lg:px-[45px] p-[20px] rounded-[20px]" key={category.id + category.slug}>
              <Link to={`${category.slug}`} className="text-[#0f1113] font-semibold text-[16px]">{category.title}</Link>
              <div className="grid grid-cols-2 gap-x-3 gap-y-4 mt-5">
                {category.subCategories.map(subCategory => (
                  <Link to={`${category.slug}/${subCategory.slug}`} key={subCategory.id + subCategory.slug} className="font-medium text-[14px] text-primary-gray hover:text-red-light transition-colors">
                    <span>{subCategory.title}</span>
                    {/* <span className="bg-green-light-100 py-[5px] px-[10px] rounded-xl text-green-dark ml-2">новое</span> */}
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default CatalogPage