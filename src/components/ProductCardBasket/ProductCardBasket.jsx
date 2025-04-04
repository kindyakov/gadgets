import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";

import { formatCurrency } from '../../utils/formatCurrency';
import { useAddInBasket } from '../../hooks/useAddInBasket';

import ProductRating from '../ProductRating/ProductRating';
import ProductExpertAssessment from '../ProductExpertAssessment/ProductExpertAssessment';
import ProductActions from '../ProductActions/ProductActions';

import { HiMinus } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";

// Реализация функции debounce
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const ProductCardBasket = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const { mutate, isPending } = useAddInBasket();

  // Создаём дебаунс-версию функции mutate
  const debouncedMutate = useRef(debounce((prod) => mutate(prod), 600)).current;

  const handleMinusClick = () => {
    if (quantity > 1) {
      product.quantity -= 1;
      setQuantity(product.quantity);
      debouncedMutate(product);
    }
  };

  const handlePlusClick = () => {
    product.quantity += 1;
    setQuantity(product.quantity);
    debouncedMutate(product);
  };

  const statusColor = {
    available: '#46d16d',
    sold_out: '#ff4d4d',
    pre_order: '#FFDF39'
  };

  const path = '/catalog' + product.path;

  return (
    <div className='w-full flex gap-4 justify-between p-4 rounded-xl border-solid border-[1px] border-[#ebf0f7]'>
      <Link to={path}
        className="overflow-hidden rounded-xl border-solid border-[1px] border-[#ebf0f7] w-[200px] flex-shrink-0 group">
        <Swiper
          className="max-full h-full"
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
        >
          {product.images.length && product.images.map(img => (
            <SwiperSlide key={img} className="my-auto flex items-center justify-center p-2">
              <img src={img} alt={product.title} width={240} height={240} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Link>
      <div className="flex-auto">
        <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
          {product.tags.length
            ? product.tags.map(tag => (
              <span key={tag + product.id} className="text-xs text-[#464646] py-1 px-2 rounded-lg bg-[#ebf0f7] font-verdana">
                {tag}
              </span>
            ))
            : ''}
        </div>
        <Link to={path} className="text-2xl font-semibold text-[#0f1113] block mt-3">
          {product.title}
        </Link>
        <ProductRating product={product} />
        <div className="w-full flex flex-col gap-1 text-sm text-[#7c7c7c] font-medium items-start mt-3">
          <p className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: statusColor[product.status.type] || 'red' }}></span>
            <span>{product.status.name}</span>
          </p>
          <p>Артикул: {product.article}</p>
          <ProductExpertAssessment product={product} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <ProductActions product={product} />
        <div className="flex items-center justify-center bg-[#E7F3F9] rounded-lg h-8">
          <button className='flex-auto h-full flex items-center justify-center transition-colors hover:text-red-light' onClick={handleMinusClick} disabled={isPending}>
            <HiMinus />
          </button>
          <span>{quantity}</span>
          <button className='flex-auto h-full flex items-center justify-center transition-colors hover:text-red-light' onClick={handlePlusClick} disabled={isPending}>
            <LuPlus />
          </button>
        </div>
        <b className='text-xl font-semibold text-nowrap mt-auto'>{formatCurrency(product.price)}</b>
      </div>
    </div>
  );
};

export default ProductCardBasket;