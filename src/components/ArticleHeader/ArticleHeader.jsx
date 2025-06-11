import { Link } from "react-router-dom"
import { IoIosArrowForward } from "react-icons/io";

const ArticleHeader = () => {
  return (
    <Link to={'/'} className='rounded-xl bg-[#f6f7fa] flex gap-3 overflow-hidden hover:shadow-lg transition-shadow duration-300 group'>
      <div className="w-[120px] h-[120px] flex-shrink-0  flex items-center justify-center bg-dark/5 overflow-hidden">
        <img src="./images/article.jpg" alt="" className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' />
      </div>
      <div className="flex flex-col gap-2 text-base">
        <span className='text-base font-semibold text-[#263141]'>Обзор устаревших смартфонов</span>
        <p className='text-[#7e8794] line-clamp-2'>Lorem ipsum dolor sit amet consectetur. Rhoncus risus  viverra enim nunc. amet consectetur. Rhoncus risus  viverra enim nunc.</p>
        <div className='text-red-light flex items-center gap-2'>
          <span>Подробнее</span>
          <IoIosArrowForward className="w-5 h-5" />
        </div>
      </div>
    </Link>
  )
}

export default ArticleHeader