import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { IoChevronBackOutline } from "react-icons/io5";
import DeliveryDoor from './DeliveryDoor';
import DeliveryCdek from './DeliveryCdek';
import DeliveryBoxberry from './DeliveryBoxberry'
import { useDeliveryStore } from '../../../store/useDeliveryStore';
import Button from '../../../ui/Button';
import { useState } from 'react';

const Delivery = ({ order, onNextStep }) => {
  const deliveryType = useDeliveryStore(state => state.deliveryType);
  const setDeliveryType = useDeliveryStore(state => state.setDeliveryType);
  const updateData = useDeliveryStore(state => state.updateData);
  const [selectDelivery, setSelectDelivery] = useState(null)
  const [isAddDelivery, setIsAddDelivery] = useState(false)

  const TabComponent = ({ type, text, }) => {
    return (
      <button className={`p-3 rounded-lg border transition-colors flex items-center gap-2 group hover:border-red-light cursor-pointer ${deliveryType === type ? 'border-red-light' : 'border-[#e0e0e0]'}`} onClick={() => setDeliveryType(type)}>
        <div className={`w-6 h-6 flex-shrink-0 rounded-full border transition-colors flex items-center justify-center p-[3px] ${deliveryType === type ? 'border-red-light' : 'border-[#e0e0e0]'}`}>
          <span className={`rounded-full w-full h-full bg-red-light transition-all ${deliveryType === type ? 'scale-100' : 'scale-0'}`}></span>
        </div>
        <p className='text-sm'>{text}</p>
      </button>
    )
  }

  const delivers = {
    door: DeliveryDoor,
    cdek: DeliveryCdek,
    boxberry: DeliveryBoxberry
  }

  const DeliveryComponent = delivers[deliveryType]

  const slideDeliveryContent = {
    door: {
      title: 'Курьером',
      icon: './svg/courier.svg',
      color: '#0178F4',
      bgColor: 'rgba(1, 120, 244, 0.1)'
    },
    cdek: {
      title: 'CDEK',
      icon: './svg/cdek.svg',
      color: '#00b33c',
      bgColor: 'rgba(0, 179, 60, 0.1)'
    },
    boxberry: {
      title: 'Boxberry',
      icon: './images/boxberry.png',
      color: '#ED1651',
      bgColor: 'rgba(237, 22, 81, 0.1)'
    },
  }

  const saveDelivery = () => {
    setDeliveryType(selectDelivery.method)
    updateData(selectDelivery.method, selectDelivery.data[selectDelivery.method])
    onNextStep()
  }

  return (
    !!order?.delivery?.length && !isAddDelivery
      ? (
        <div className='mt-5 flex flex-col gap-3'>
          <Swiper
            className='w-full swiper-delivery relative'
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1.2}
            breakpoints={{
              480: {
                slidesPerView: 1.8
              },
              640: {
                slidesPerView: 2.5
              },
              1024: {
                slidesPerView: 3.5
              },
              1280: {
                slidesPerView: 3.5
              }
            }}
          >
            {order?.delivery.map((item, i) => {
              const { title, icon, color, bgColor } = slideDeliveryContent[item.method]
              const isActive = selectDelivery ? selectDelivery.id === item.id : i === 0

              if (!selectDelivery) {
                setSelectDelivery(order?.delivery[0])
              }

              return (
                <SwiperSlide key={item.id} style={{ height: 'auto' }}>
                  <div
                    className={`h-[120px] flex flex-col p-3 rounded-xl border-[2px] gap-2 cursor-pointer transition-all hover:grayscale-0 active:scale-95 ${isActive ? '' : 'grayscale-[100%]'}`}
                    style={{ borderColor: color, backgroundColor: bgColor }}
                    onClick={() => setSelectDelivery(item)}
                  >
                    <div className="flex items-center gap-2">
                      <img src={icon} alt="Иконка" className='w-7 h-7' />
                      <h4 className='text-xl font-bold' style={{ color }}>{title}</h4>
                    </div>
                    <div className="text-xs mt-auto" style={{ color }}>{item.address}</div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className="flex justify-between gap-3">
            <button className='underline underline-offset-4 hover:text-red-light hover:no-underline' onClick={() => setIsAddDelivery(true)}>Добавить доставку</button>
            <Button disabled={!selectDelivery} onClick={saveDelivery}>Перейти к выбору платежа</Button>
          </div>
        </div>
      )
      : (
        <>
          <button
            className='mt-5 underline underline-offset-4 flex items-center transition-colors hover:text-red-light hover:no-underline'
            onClick={() => setIsAddDelivery(false)}
          >
            <IoChevronBackOutline className='w-4 h-4' />
            <span>Вернуться</span>
          </button>

          <div className="flex gap-4 mt-3">
            <TabComponent text='Доставка до двери' type='door' />
            <TabComponent text='Пункт выдачи (CDEK)' type='cdek' />
            <TabComponent text='Пункт выдачи (Boxberry)' type='boxberry' />
          </div>

          <DeliveryComponent onNextStep={onNextStep} order={order} />
        </>
      )
  )
};

export default Delivery;
