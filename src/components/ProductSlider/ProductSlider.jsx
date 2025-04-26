import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Controller } from 'swiper/modules';

const ProductSlider = ({ product }) => {
  const [mainSwiper, setMainSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (
      mainSwiper &&
      thumbsSwiper &&
      mainSwiper.controller &&
      thumbsSwiper.controller
    ) {
      mainSwiper.controller.control = thumbsSwiper;
      thumbsSwiper.controller.control = mainSwiper;
    }
  }, [mainSwiper, thumbsSwiper]);

  return (
    <>
      <Swiper
        className="select-none max-h-[700px] max-w-full min-h-[400px] swiper-product-page"
        modules={[Navigation, Controller]}
        onSwiper={setMainSwiper}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        loop={false}
        controller={{ control: thumbsSwiper }}
      >
        {product.images.map((image) => (
          <SwiperSlide key={image} className="flex items-center justify-center">
            <img src={image} alt={product.title} className="max-h-full max-w-full object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className="max-w-full select-none swiper-product-thumbs swiper-product-page"
        modules={[Navigation, Controller]}
        onSwiper={setThumbsSwiper}
        // navigation
        spaceBetween={10}
        slidesPerView={3}
        centeredSlides={true}
        slideToClickedSlide={true}
        loop={false}
        controller={{ control: mainSwiper }}
      >
        {product.images.map(image => (
          <SwiperSlide key={image}
            className="flex items-center justify-center p-3 border rounded-xl cursor-pointer group">
            <img src={image} alt={product.title}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default ProductSlider