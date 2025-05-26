import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formattedDate";
import { handleErrorImg } from "../../utils/handleErrorImg"
import Button from '../../ui/Button';

const statusColors = {
  pending: 'text-[#0177F2] bg-[#0177F2]/10 border-[#0177F2]',
  paid: 'text-[#0179f5] bg-[#0179f5]/10 border-[#0179f5]',
  canceled: 'text-black bg-gray/10 border-black',
  completed: 'text-black bg-gray/10  border-[#000]',
};

const statusMessage = {
  pending: 'Ожидает подтверждения оплаты',
  paid: 'Оплачено, ожидает отправки',
  completed: 'Заказ завершен',
  canceled: 'Заказ отменен',
};

export default function OrderCard({ order }) {
  const cardContent = (
    <div className="w-full flex items-center gap-3 p-4 rounded-lg border border-gray-300 shadow-md
                 transform transition duration-200 ease-in-out group-hover:shadow-lg group-hover:shadow-blue/20">
      {/* Картинки товаров */}
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
      {/* Основная информация */}
      <div className="flex flex-col flex-grow items-start">
        {/* Статус с цветом */}
        <span
          className={`inline px-3 py-1 rounded-md font-semibold text-sm border ${statusColors[order.status] || 'text-black bg-gray-100 border-gray-300'
            }`}
        >
          {statusMessage[order.status] || 'Статус неизвестен'}
        </span>

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
          <Button className="mt-2 bg-red-light/10 border border-red-light text-red-light hover:bg-red-light hover:text-[#fff]" style={{ padding: '4px 8px' }}>
            Оставить отзыв
          </Button>
        )}
      </div>

      {/* Итоговая сумма */}
      <div className="text-right">
        <div className="text-lg font-bold text-black">{formatCurrency(order.total)}</div>
      </div>
    </div>
  );

  return order.status === 'pending' ? (
    <Link to={`/order-registration?orderId=${order.id}`} className='block group'>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}