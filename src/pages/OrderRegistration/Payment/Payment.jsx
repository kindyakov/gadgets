import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useDeliveryStore } from '../../../store/useDeliveryStore';

const Payment = ({ order }) => {
  const { paymentType, setPaymentType } = useDeliveryStore();

  return (
    <Swiper
      className='mt-5 swiper-payment relative'
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={5}
    >
      {order?.paymentMethods.map((method) => (
        <SwiperSlide key={method.id} className='h-auto' style={{ height: 'auto' }}>
          <div
            onClick={() => setPaymentType(method.id)}
            className={`flex flex-col items-center justify-center text-center p-4 rounded-lg border cursor-pointer transition-colors h-full hover:border-green-light ${paymentType === method.id ? 'border-green-light bg-green-light/20 text-green-light' : 'border-[#e0e0e0]'}`}
          >
            <div style={{ fontSize: '24px' }}>{method.icon}</div>
            <div>{method.name}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Payment;
