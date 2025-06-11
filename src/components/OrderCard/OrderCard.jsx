import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

import { FaCheckCircle } from "react-icons/fa";
import { FcPaid } from "react-icons/fc";
import { TbCancel, TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePendingActions } from "react-icons/md";

import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formattedDate";
import { handleErrorImg } from "../../utils/handleErrorImg"
import Button from '../../ui/Button';

const statusOpts = {
  pending: { text: 'Ожидает подтверждения оплаты', colors: 'text-yellow-light bg-yellow-light/10 border-yellow-light', Icon: MdOutlinePendingActions },
  paid: { text: 'Оплачено, ожидает отправки', colors: 'text-blue bg-blue/10 border-blue', Icon: FcPaid },
  completed: { text: 'Заказ получен', colors: 'text-green-light bg-green-light/10  border-green-light', Icon: FaCheckCircle },
  canceled: { text: 'Заказ отменен', colors: 'text-red-light bg-red-light/10 border-red-light', Icon: TbCancel },
  delivered: { text: 'Заказ доставляется', colors: 'text-blue bg-blue/10 border-blue', Icon: TbTruckDelivery },
}

export default function OrderCard({ order }) {
  const { text, Icon, colors } = statusOpts[order.status]

  return (
    <Link to={`/order-registration?orderId=${order.id}`} className='block group'>
      <div className="w-full flex items-center gap-3 p-4 rounded-lg border border-gray-300 shadow-md transform transition duration-200 ease-in-out group-hover:shadow-lg group-hover:shadow-blue/20">
        <Swiper
          style={{
            '--swiper-pagination-bullet-size': '5px',
            '--swiper-pagination-bullet-inactive-opacity': '0.5',
            '--swiper-pagination-bullet-horizontal-gap': '2px',
          }}
          className="w-24"
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={5}
          slidesPerView={1}
        >
          {order.products.map(p => (
            <SwiperSlide key={p.id} className="flex items-center justify-center overflow-hidden rounded-md border border-gray-200">
              <img
                src={p.images[0]}
                alt={p.title}
                className="max-w-full max-h-full object-contain"
                style={{ userSelect: 'none' }}
                onError={handleErrorImg}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex flex-col flex-grow items-start">
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-md font-semibold text-sm border ${colors || 'text-black bg-gray-100 border-gray-300'
              }`}
          >
            <Icon className='stroke w-5 h-5 flex-shrink-0' />
            <span>{text || 'Статус неизвестен'}</span>
          </div>

          {/* Название и детали */}
          <h3 className="text-xl font-bold mt-2 text-black truncate max-w-xl">
            {order.products.map(p => p.title).join(', ')}
          </h3>

          {/* Дата и кол-во */}
          <div className="mt-1 text-gray-600 text-sm flex gap-6">
            <span>Дата: {formatDate(order.createdAt)}</span>
            <span>Товаров: {order.countProduct}</span>
          </div>

          {order.status === 'completed' && (
            <Button className="blue mt-2 bg-blue/10 border border-blue text-blue hover:bg-blue hover:text-[#fff]" style={{ padding: '2px 8px' }}>
              Оставить отзыв
            </Button>
          )}
        </div>

        {/* Итоговая сумма */}
        <div className="text-right">
          <div className="text-lg font-bold text-black">{formatCurrency(order.total)}</div>
        </div>
      </div>
    </Link>
  )
}