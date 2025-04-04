import { useMemo, useEffect } from 'react'
import { Link, } from 'react-router-dom'
import { useBasket } from '../../../hooks/useBasket'
import { useUserStore } from '../../../store/useUserStore'
import ProductCardBasket from '../../../components/ProductCardBasket/ProductCardBasket'
import { formatCurrency } from '../../../utils/formatCurrency'

const Basket = () => {
  const { data, isFetching } = useBasket()
  const { updatedBasket, basket } = useUserStore()
  const totalPrice = useMemo(() => basket?.reduce((acc, item) => acc + item.totalPrice, 0), [basket])

  useEffect(() => {
    if (data) {
      // updatedBasket(data);
    }
    console.log(data);
  }, [data, basket, updatedBasket])

  return (
    <div className="h-full flex gap-3">
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
        {isFetching ? 'Loading...' : ''}
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