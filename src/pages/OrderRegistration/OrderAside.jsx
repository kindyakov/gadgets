import Button from '../../ui/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import { declOfNum } from '../../utils/declOfNum';
import { formatCurrency } from '../../utils/formatCurrency';
import { handleErrorImg } from '../../utils/handleErrorImg';
import { useOrderFlowStore } from '../../store/useOrderFlowStore';
// import { useDeliveryStore } from '../../store/useDeliveryStore';

const OrderAside = ({ order, handleClickPay, isCreatePayment }) => {
  // const d = useDeliveryStore()
  const { step } = useOrderFlowStore()

  return (
    <aside className="w-2/6 p-4 rounded-xl bg-[#F2F5F9]">
      <Button className='w-full py-4 font-bold' onClick={handleClickPay} disabled={step !== 3 || isCreatePayment}>Оплатить онлайн</Button>
      <div className="text-[#808d9a] text-sm mt-2">
        Нажимая на кнопку, вы соглашаетесь с <a href="" className='text-red-light transition-colors hover:opacity-70'>Условиями обработки персональных данных</a> , а также с <a href="" className='text-red-light transition-colors hover:opacity-70'>Условиями продаж</a>
      </div>
      <div className="w-full h-[1px] bg-[#cacaca] my-4"></div>
      <div className="w-full flex justify-between gap-2 items-center">
        <h4 className='font-bold text-2xl'>Ваш заказ</h4>
        <span className='text-[rgba(0,26,52,.6)] text-sm'>
          {order?.countProduct} {declOfNum(order?.countProduct, ['товар', 'товара', 'товаров'])}
        </span>
      </div>
      <Swiper
        className="max-full mt-2"
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={3}
      >
        {order?.products?.map(({ id, title, images, quantity }) => (
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
          {formatCurrency(order?.total)}
        </span>
      </div>
    </aside>
  )
}

export default OrderAside