import { useEffect, useMemo } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Page from '../Page'
import { useUserStore } from '../../store/useUserStore'
import Button from '../../ui/Button';
import { declOfNum } from '../../utils/declOfNum';
import { formatCurrency } from '../../utils/formatCurrency';
import FormContactInformation from './FormContactInformation';

const OrderRegistration = () => {
  const isAuth = useUserStore(state => state.isAuth)
  const basket = useUserStore(state => state.basket)
  const user = useUserStore(state => state.user)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  searchParams.size
  const productIds = searchParams.getAll('productIds').map(id => parseInt(id))
  const selectProducts = basket.filter(p => productIds.includes(p.id))
  const totalPrice = useMemo(() => selectProducts?.reduce((acc, item) => acc + item.totalPrice || 0, 0), [selectProducts])
  const countProduct = useMemo(() => selectProducts?.reduce((acc, item) => acc + item.quantity || 0, 0), [selectProducts])

  useEffect(() => {
    if (!isAuth) {
      navigate('/')
      return
    }

    if (!countProduct) {
      navigate('/account/basket')
      return
    }
  }, [isAuth, basket]);

  const handleErrorImg = (e) => {
    e.target.src = '/images/placeholder.png'
  }

  return (
    <Page isBreadcrumbs={false}>
      <div className="mt-5">
        <Link
          to={'/account/basket'}
          className='inline-flex items-center gap-2 text-sm transition-colors hover:text-red-light'
        >
          <span>Вернуться в корзину</span>
        </Link>
        <h1 className='text-4xl font-bold mt-2'>Оформление заказа</h1>
      </div>
      <div className="flex py-5">
        <div className="w-4/5">
          <h3 className='text-2xl font-bold'>Контактные данные</h3>
          <FormContactInformation user={user} />
        </div>

        <div className="w-2/6 p-4 rounded-xl bg-[#F2F5F9]">
          <Button className='w-full py-4 font-bold'>Оплатить онлайн</Button>
          <div className="text-[#808d9a] text-sm mt-2">
            Нажимая на кнопку, вы соглашаетесь с <a href="" className='text-red-light transition-colors hover:opacity-70'>Условиями обработки персональных данных</a> , а также с <a href="" className='text-red-light transition-colors hover:opacity-70'>Условиями продаж</a>
          </div>
          <div className="w-full h-[1px] bg-[#cacaca] my-4"></div>
          <div className="w-full flex justify-between gap-2 items-center">
            <h4 className='font-bold text-2xl'>Ваш заказ</h4>
            <span className='text-[rgba(0,26,52,.6)] text-sm'>
              {countProduct} {declOfNum(countProduct, ['товар', 'товара', 'товаров'])}
            </span>
          </div>
          <Swiper
            className="max-full mt-2"
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={3}
          >
            {selectProducts.map(({ id, title, images, quantity }) => (
              <SwiperSlide key={id} style={{ display: 'flex' }} className="flex relative items-center justify-center p-2 min-h-36 rounded-lg border border-[#cacaca]">
                <img src={images[0]} alt={title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" onError={handleErrorImg} />
                <span className='absolute bottom-1 text-xs bg-red-light w-5 h-5 flex items-center justify-center text-white rounded-full'>{quantity}</span>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-full h-[1px] bg-[#cacaca] my-4"></div>

          <div className="wp-input">
            <input type="text" name='promoCode' placeholder='Промокод' className='input' />
          </div>
          <div className="w-full flex justify-between gap-2 mt-4">
            <h4 className='font-bold text-2xl'>Итог</h4>
            <span className='font-bold text-xl'>
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default OrderRegistration