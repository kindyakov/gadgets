import { useEffect, useCallback } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';

import { useCreatePayment } from '../../hooks/useCreatePayment';
import { useOrder } from '../../hooks/useOrder';
import { useUserStore } from '../../store/useUserStore'
import { useDeliveryStore } from '../../store/useDeliveryStore';

import Page from '../Page'
import Loader from '../../components/Loader/Loader'
import OrderContent from './OrderContent';
import OrderAside from './OrderAside';

const OrderRegistration = () => {
  const { mutate: createPayment, isPending, } = useCreatePayment()
  const isAuth = useUserStore(state => state.isAuth)
  const { data, deliveryType, client, paymentType, setDeliveryType } = useDeliveryStore();

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')
  const { data: order, isLoading } = useOrder(orderId)

  const handleClickPay = useCallback(async () => {
    createPayment({
      delivery: {
        method: deliveryType,
        data
      },
      client,
      orderId,
      paymentType,
      return_url: 'http://localhost:5173/account/orders',
    })
  }, [data, deliveryType, client])

  useEffect(() => {
    if (!isAuth) {
      navigate('/')
      return
    }

    if (!orderId) {
      navigate('/account/basket')
      return
    }

    if (order && order?.delivery?.method) {
      setDeliveryType(order.delivery.method)
    }
  }, [isAuth, orderId, order]);

  return (
    <Page isBreadcrumbs={false}>

      <div className={`fixed w-full h-full inset-0 transition-opacity z-[5] bg-[rgba(0,0,0,0.15)] ${isLoading || isPending ? '' : 'opacity-0 invisible'}`}>
        <Loader color='red' width={60} height={60} />
      </div>

      <div className="mt-5">
        <Link
          to={'/account/basket'}
          className='inline-flex items-center gap-2 text-sm transition-colors hover:text-red-light'
        >
          <span>Вернуться в корзину</span>
        </Link>
        <h1 className='text-4xl font-bold mt-2 text-center'>Оформление заказа</h1>
      </div>
      <div className="flex py-5 gap-3">
        <OrderContent order={order} />
        <OrderAside order={order} handleClickPay={handleClickPay} isCreatePayment={isPending} />
      </div>
    </Page>
  )
}

export default OrderRegistration