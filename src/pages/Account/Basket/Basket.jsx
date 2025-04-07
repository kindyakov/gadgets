import { useMemo } from 'react'
import { Link, } from 'react-router-dom'
import { useIsMutating } from '@tanstack/react-query'
import { useUserStore } from '../../../store/useUserStore'
import ProductCardBasket from '../../../components/ProductCardBasket/ProductCardBasket'
import { formatCurrency } from '../../../utils/formatCurrency'
import Loader from '../../../components/Loader/Loader'

const Basket = () => {
  const { updatedBasket, basket } = useUserStore()
  const isMutating = useIsMutating({ mutationKey: ['add-in-basket'] });
  const totalPrice = useMemo(() => basket?.reduce((acc, item) => acc + item.totalPrice, 0), [basket])

  return (
    <div className="h-full flex gap-3 relative">
      <div className={`absolute w-full h-full inset-0 transition-opacity z-[5] bg-[rgba(0,0,0,0.15)] ${isMutating ? '' : 'opacity-0 invisible'}`}>
        <Loader className={`${isMutating ? '' : ''}`} color='red' width={60} height={60} />
      </div>
      <div className="flex flex-col gap-3 p-3 relative h-full w-3/4">
        {basket?.length ? (
          basket.map((product, index) => (
            <ProductCardBasket key={index} product={product} />
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
      <aside className="w-1/4 p-3">
        <ul className='flex flex-col gap-2 w-full'>
          <li className='flex justify-between gap-2'>
            <b>Итог:</b>
            <b>{formatCurrency(totalPrice)}</b>
          </li>
        </ul>
        <button className='button w-full mt-3'>К оплате</button>
      </aside>
    </div>
  )
}

export default Basket