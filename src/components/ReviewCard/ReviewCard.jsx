import { Link } from "react-router-dom"
import { ArrowSvg } from "../../ui/svg/ArrowSvg"


const ReviewCard = ({ review }) => {
  return (
    <article className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
      <Link to={`/reviews/${review.slug}`} className="w-full lg:h-80 h-40 overflow-hidden">
        <img src={review.image} alt={review.title} className="w-full h-full object-cover" />
      </Link>
      <div className="p-4 flex-grow flex flex-col gap-2 bg-[#f6f7fa]">
        <h4 className="text-lg font-semibold line-clamp-3">{review.title}</h4>
        <p className="text-[#7e8794] font-normal text-sm line-clamp-3">{review.description}</p>
        <Link to={`/reviews/${review.slug}`} className="flex items-center text-red-light font-medium mt-auto">
          <span>Смотреть</span>
          <ArrowSvg />
        </Link>
      </div>
    </article>
  )
}

export default ReviewCard