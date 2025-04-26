import { useState, useRef } from 'react';
import { Link } from "react-router-dom";

import { useUserStore } from '../../store/useUserStore';
import { formatCurrency } from '../../utils/formatCurrency';
import { useAddInBasket } from '../../hooks/useAddInBasket';

import ProductImageSlider from '../ProductImageSlider/ProductImageSlider';
import ProductRating from '../ProductRating/ProductRating';
import ProductExpertAssessment from '../ProductExpertAssessment/ProductExpertAssessment';
import ProductActions from '../ProductActions/ProductActions';

import { HiMinus } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { FaBoltLightning } from "react-icons/fa6";
import { CheckSvg } from '../../ui/svg/CheckSvg'

// Реализация функции debounce
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const ProductCardBasket = ({ product, handleClickDelete, handleCreateOrder }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const { mutate, isPending } = useAddInBasket();
  const { selectProducts, setSelectProducts } = useUserStore()
  // Создаём дебаунс-версию функции mutate
  const debouncedMutate = useRef(debounce((prod) => mutate(prod), 300)).current;
  const isChecked = selectProducts.find(p => p.id === product.id)

  const handleMinusClick = () => {
    if (quantity > 1) {
      const newProduct = { ...product, quantity: quantity - 1 };
      setQuantity(newProduct.quantity);
      debouncedMutate(newProduct);
    }
  };

  const handlePlusClick = () => {
    const newProduct = { ...product, quantity: quantity + 1 };
    setQuantity(newProduct.quantity);
    debouncedMutate(newProduct);
  };

  const handleChangeCheckbox = () => {
    if (selectProducts.find(p => p.id === product.id)) {
      const updatedSelectProducts = selectProducts.filter(p => p.id !== product.id)
      setSelectProducts(updatedSelectProducts)
    } else {
      setSelectProducts([...selectProducts, product])
    }
  }

  const statusColor = {
    available: '#46d16d',
    sold_out: '#ff4d4d',
    pre_order: '#FFDF39'
  };

  const path = '/catalog' + product.path;

  return (
    <div className='w-full flex gap-4 justify-between p-4 rounded-xl border-solid border-[1px] border-[#ebf0f7] relative'>
      <input type="checkbox" className="checkbox-input" id={product.id}
        checked={isChecked}
        onChange={handleChangeCheckbox} />
      <label htmlFor={product.id} className="checkbox-label absolute z-[2] top-[10px] left-[10px] bg-white select-none">
        <CheckSvg />
      </label>

      <ProductImageSlider product={product} path={path} />
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
        <div className="flex gap-3 mt-2">
          <button
            className='w-8 h-8 flex items-center justify-center flex-shrink-0 border-[1px] border-solid border-[#dbdbdb] rounded-md transition-colors hover:text-[#fff] hover:bg-red-light'
            onClick={() => handleClickDelete([product])}>
            <MdOutlineDelete className='w-5 h-5' />
          </button>
          <button
            className='h-8 px-2 flex items-center gap-1 justify-center flex-shrink-0 border-[1px] border-solid border-[#dbdbdb] rounded-md transition-colors hover:text-[#fff] hover:bg-red-light group'
            onClick={() => handleCreateOrder([product])}
          >
            <FaBoltLightning className='fill-red-light stroke-red-light' />
            <span>Купить</span>
          </button>
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
        <b className='text-xl font-semibold text-nowrap mt-auto'>{formatCurrency(product.totalPrice)}</b>
      </div>
    </div>
  );
};

export default ProductCardBasket;