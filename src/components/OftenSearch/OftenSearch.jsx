import { IoIosArrowForward } from "react-icons/io";

const OftenSearch = () => {
  return (
    <>
      <ul className='flex flex-col mt-3'>
        <li className="cursor-pointer text-base text-[#263141] transition-colors border-[#eceeef] border-b py-3 hover:text-red-light">Телевизор</li>
        <li className="cursor-pointer text-base text-[#263141] transition-colors border-[#eceeef] border-b py-3 hover:text-red-light">iPhone 14</li>
        <li className="cursor-pointer text-base text-[#263141] transition-colors border-[#eceeef] border-b py-3 hover:text-red-light">Планшет</li>
        <li className="cursor-pointer text-base text-[#263141] transition-colors border-[#eceeef] border-b py-3 hover:text-red-light">Смартфоны</li>
        <li className="cursor-pointer text-base text-[#263141] transition-colors border-[#eceeef] border-b py-3 hover:text-red-light">iPhone</li>
      </ul>
      <a href="" className="mt-4 flex items-center gap-2 text-red-light underline-offset-4 hover:underline">
        <span>Смотреть все результаты</span>
        <IoIosArrowForward className="w-5 h-5" />
      </a>
    </>
  )
}

export default OftenSearch