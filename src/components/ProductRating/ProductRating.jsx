import { Link } from "react-router-dom"
import { StarSvg } from "../../ui/svg/StarSvg";
import { declOfNum } from "../../utils/declOfNum";

const ProductRating = ({ product = {}, isOnlyStars = false }) => {
  if (Object.keys(product).length === 0) {
    return ''
  }

  const Starts = ({ product }) => {
    return (
      <div className="relative inline-block">
        <div className="flex">
          <StarSvg color="#c3cad4" className="w-5 h-5 flex-shrink-0" />
          <StarSvg color="#c3cad4" className="w-5 h-5 flex-shrink-0" />
          <StarSvg color="#c3cad4" className="w-5 h-5 flex-shrink-0" />
          <StarSvg color="#c3cad4" className="w-5 h-5 flex-shrink-0" />
          <StarSvg color="#c3cad4" className="w-5 h-5 flex-shrink-0" />
        </div>
        <div
          className="absolute inset-0 w-full overflow-hidden flex"
          style={{ width: `${(product.rating / 5) * 100}%` }}
        >
          <StarSvg color="#ff4d4d" className="w-5 h-5 flex-shrink-0" />
          <StarSvg color="#ff4d4d" className="w-5 h-5 flex-shrink-0" />
          <StarSvg color="#ff4d4d" className="w-5 h-5 flex-shrink-0" />
          <StarSvg color="#ff4d4d" className="w-5 h-5 flex-shrink-0" />
          <StarSvg color="#ff4d4d" className="w-5 h-5 flex-shrink-0" />
        </div>
      </div>
    )
  }

  if (isOnlyStars) {
    return <Starts product={product} />
  }

  return (
    <div className="flex items-center gap-2 text-[14px] font-medium text-[#7e8794]">
      <span>{product.rating}</span>
      <Starts product={product} />
      <Link to={`/catalog/${product.categorySlug}/${product.subCategorySlug}/${product.slug}#reviews`}
        className="underline underline-offset-2">
        {product.reviewCount} {declOfNum(product.reviewsCount, ['Отзыв', 'Отзыва', 'Отзывов'])}
      </Link>
    </div>
  )
}

export default ProductRating