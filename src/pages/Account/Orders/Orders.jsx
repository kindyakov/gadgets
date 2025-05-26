import { Link } from "react-router-dom"
import { useOrders } from "../../../hooks/useOrder"
import Loader from '../../../components/Loader/Loader'
import OrderCard from "../../../components/OrderCard/OrderCard"

const Orders = () => {
  const { data, isLoading, isSuccess } = useOrders()

  return (
    <div className="w-full h-full relative">
      <div className={`absolute w-full h-full inset-0 transition-opacity z-[5] bg-[rgba(0,0,0,0.15)] ${isLoading ? '' : 'opacity-0 invisible'}`}>
        <Loader color='red' width={60} height={60} />
      </div>

      {isSuccess && data?.length == 0 ? (
        <div className="`absolute w-full h-full inset-0 flex flex-col gap-2 items-center justify-center text-center p-4">
          <p className="text-3xl font-bold">Вы ещё не сделали ни одного заказа</p>
          <Link to='/account/basket' className="transition-colors hover:text-red-light">Перейти в корзину</Link>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-3 p-3">
          {data?.length ? data.map(order => (
            <OrderCard order={order} key={order.id} />
          )).reverse() : ''}
        </div>
      )
      }
    </div >
  )
}

export default Orders