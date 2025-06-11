import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { handleErrorImg } from '../../utils/handleErrorImg';

const ProductImageSlider = ({ product, path }) => {
  return (
    <Link to={path}
      className="overflow-hidden rounded-xl border-solid border-[1px] border-[#ebf0f7] w-[200px] flex-shrink-0 group">
      <Swiper
        className="max-full h-full"
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
      >
        {product.images.length && product.images.map(img => (
          <SwiperSlide
            key={img}
            className="my-auto flex items-center justify-center p-2 max-h-[210px]"
            style={{ display: 'flex' }}
          >
            <img
              src={img}
              alt={product.title}
              width={240}
              height={240}
              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
              onError={handleErrorImg}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Link>
  );
}

export default ProductImageSlider