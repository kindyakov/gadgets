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
            className={`h-[100px] p-[6px] rounded-lg border-[2px] cursor-pointer transition-colors hover:border-green-light ${paymentType === method.id ? 'border-green-light bg-green-light/20 text-green-light' : 'border-[#e0e0e0]'}`}
          >
            <div className="w-full h-full overflow-hidden rounded-md flex items-center justify-center  text-center">
              {method.icon ? <img src={method.icon} alt={method.name} className='w-full h-auto object-contain' />
                : <span className='text-xs'>{method.name}</span>}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Payment;
