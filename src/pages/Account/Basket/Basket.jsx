import { useMemo } from 'react'
import { Link, } from 'react-router-dom'
import { useIsMutating } from '@tanstack/react-query'

import { useUserStore } from '../../../store/useUserStore'
import { useDeleteFromBasket } from '../../../hooks/useDeleteFromBasket'
import { formatCurrency } from '../../../utils/formatCurrency'

import ProductCardBasket from '../../../components/ProductCardBasket/ProductCardBasket'
import Loader from '../../../components/Loader/Loader'

import { CheckSvg } from '../../../ui/svg/CheckSvg'

const Basket = () => {
  const { basket, selectProducts, setSelectProducts } = useUserStore()
  const { mutate, isPending } = useDeleteFromBasket()
  const isMutating = useIsMutating({ mutationKey: ['add-in-basket'] });
  const totalPrice = useMemo(() => selectProducts?.reduce((acc, item) => acc + item.totalPrice || 0, 0), [selectProducts])

  const handleChangeCheckbox = () => {
    if (basket.length === selectProducts.length) {
      setSelectProducts([])
    } else {
      setSelectProducts(basket)
    }
  }

  const handleClickDelete = (products) => {
    mutate(products)
  }

  const handleCreateOrder = (products) => {
    console.log(products);
  }

  return (
    <div className="h-full flex relative">

      <div className={`absolute w-full h-full inset-0 transition-opacity z-[5] bg-[rgba(0,0,0,0.15)] ${isMutating || isPending ? '' : 'opacity-0 invisible'}`}>
        <Loader color='red' width={60} height={60} />
      </div>

      <div className="flex flex-col gap-3 p-3 relative h-full w-3/4">
        <div className="flex items-center gap-3 w-full p-2 bg-[#E7F3F9] rounded-md">
          <label className='flex gap-2 items-center cursor-pointer select-none'>
            <input type="checkbox" className="checkbox-input" id="display0"
              checked={basket.length === selectProducts.length}
              onChange={handleChangeCheckbox} />
            <label htmlFor="display0" className="checkbox-label w-6 h-6 border-[#c0c0c0]">
              <CheckSvg />
            </label>
            <span>Выбрать все</span>
          </label>
          {
            selectProducts.length > 0
            && <button
              className='text-red-light transition-opacity hover:opacity-70'
              onClick={() => handleClickDelete(selectProducts)}>
              Удалить выбранные
            </button>
          }
        </div>

        <div className="flex flex-col gap-3">
          {basket?.length ? (
            basket.map((product, index) => (
              <ProductCardBasket
                key={index}
                product={product}
                handleClickDelete={handleClickDelete}
                handleCreateOrder={handleCreateOrder} />
            ))
          ) : (
            <div className='flex items-center justify-center p-3 text-center absolute w-full h-full inset-0'>
              <div>
                <h4 className='text-xl font-semibold'>Нет товаров в корзине</h4>
                <Link to='/catalog' className='text-red-light font-semibold hover:underline'>Перейти в каталог</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <aside className="w-1/4 p-3">
        <ul className='flex flex-col gap-2 w-full'>
          <li className='flex justify-between gap-2'>
            <b>Итог:</b>
            <b>{formatCurrency(totalPrice)}</b>
          </li>
        </ul>
        <button
          className='button w-full mt-3'
          disabled={!selectProducts.length}
          onClick={() => handleCreateOrder(selectProducts)}
        >
          Перейти к оформление
        </button>
        {!selectProducts.length
          ? (
            <div className="flex gap-2 p-2 bg-[#F2F5F9] mt-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ color: 'rgba(0, 26, 52, 0.4)' }}
                className="flex-shrink-0 w-6 h-6">
                <path fill="currentColor" d="M12 21c5.584 0 9-3.416 9-9s-3.416-9-9-9-9 3.416-9 9 3.416 9 9 9m1-13a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-2 4a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0z"></path>
              </svg>
              <p className='text-[13px] text-[rgba(0,26,52,0.6)]'>Выберите товары, чтобы перейти к оформлению заказа</p>
            </div>
          )
          : ''}
      </aside>
    </div>
  )
}

export default Basket