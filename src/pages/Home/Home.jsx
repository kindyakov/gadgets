import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';

import Page from "../Page"
import img from "/images/site/Banner-Normal.jpg"
import { Link } from "react-router-dom"
import { useProducts } from "../../hooks/useProducts"
import { useCategories } from "../../hooks/useCategories"
import { useReviews } from '../../hooks/useReviews';
import { ArrowSvg } from "../../ui/svg/ArrowSvg"
import { GooglePlaySvg } from "../../ui/svg/GooglePlaySvg"
import { AppStoreSvg } from "../../ui/svg/AppStoreSvg"

import ProductCard from '../../components/ProductCard/ProductCard';
import ReviewCard from '../../components/ReviewCard/ReviewCard';

const Home = () => {
  const { data: categories } = useCategories()
  const { data: newProducts } = useProducts({ isNew: true })
  const { data: reviews } = useReviews()
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Page>
      <section className="mt-10">
        <div className="flex flex-col md:flex-row gap-5">
          <div className={`md:w-3/5 bg-[#f2f5f9] p-5 lg:p-10 rounded-2xl bg-cover bg-center`} style={{ backgroundImage: `url(${img})` }}>
            <h2 className="font-extrabold text-[20px] xl:text-[48px] lg:text-[36px] md:text-[26px] text-[#0f1113]">
              <span className="text-red-light">1.8 млн</span> товаров в <span className="text-red-light">2272</span> магазинах найди, сравни, выбирай!
            </h2>
            <Link to="/catalog" className="button md:mt-7 mt-4">
              <span>Перейти к категориям</span>
              <ArrowSvg color='#fff' />
            </Link>
          </div>
          <div className="md:w-2/5 bg-[#f2f5f9] p-5 lg:p-10 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
            <h2 className="font-extrabold text-[20px] xl:text-[48px] lg:text-[36px] md:text-[26px] text-[#0f1113]">
              <span className="text-red-light">Топ-10</span> смартфонов<br />2023 года
            </h2>
            <Link to="/catalog" className="button md:mt-7 mt-4">
              <span>Смотреть</span>
              <ArrowSvg color='#fff' />
            </Link>
          </div>
        </div>
      </section>
      <section className="mt-12 bg-primary-background">
        <div className="">
          <h3 className="title-h3">Лучший выбор</h3>
          <Swiper
            className='mt-6'
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={6}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              duration: 1000,
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              480: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 6,
              }
            }}
          >
            {categories?.length && categories.map(category => (
              <SwiperSlide key={category.id}>
                <Link to={`/catalog/${category.slug}`} className="flex flex-col items-center gap-3 text-center hover:text-red-light transition-colors">
                  <div className="flex items-center justify-center overflow-hidden md:h-[165px] h-[80px] w-[80px] bg-[#fdfdfd] md:w-[165px] rounded-xl border-solid border-[#f2f5f9] border-2">
                    <img src={`${category.image}`} alt={`photo-${category.slug}`} className="max-w-full max-h-full" />
                  </div>
                  <p>{category.title}</p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className='pt-32 pb-20'>
        <div className="">
          <h3 className="title-h3">Наша цель - создать фантастический <br /> сервис для всех потребителей</h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-5 mt-5">
            <div className="flex flex-col gap-3">
              <b className='text-bold lg:text-5xl text-3xl text-red-light'>5</b>
              <p className='text-[#0f1113] font-normal'>Lorem ipsum dolor sit amet consectetur. Rhoncus risus nunc a pharetra viverra enim nunc. </p>
            </div>
            <div className="flex flex-col gap-3">
              <b className='text-bold lg:text-5xl text-3xl text-red-light'>30</b>
              <p className='text-[#0f1113] font-normal'>Lorem ipsum dolor sit amet consectetur. Rhoncus risus nunc a pharetra viverra enim nunc. </p>
            </div>
            <div className="flex flex-col gap-3">
              <b className='text-bold lg:text-5xl text-3xl text-red-light'>300</b>
              <p className='text-[#0f1113] font-normal'>Lorem ipsum dolor sit amet consectetur. Rhoncus risus nunc a pharetra viverra enim nunc. </p>
            </div>
            <div className="flex flex-col gap-3">
              <b className='text-bold lg:text-5xl text-3xl text-red-light'>8</b>
              <p className='text-[#0f1113] font-normal'>Lorem ipsum dolor sit amet consectetur. Rhoncus risus nunc a pharetra viverra enim nunc. </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex gap-5 bg-[#f6f7fa] rounded-2xl xl:p-20 md:p-10 p-5 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${img})` }}>
          <div className="flex flex-col gap-10">
            <p className='font-bold lg:text-5xl md:text-3xl text-2xl text-[#0f1113]'><span className='text-red-light'>Экономьте</span> свое время
              и получайте <span className='text-red-light'>максимум</span>
              от ежедневных покупок</p>
            <div className="flex gap-4 flex-wrap">
              <a href=""><GooglePlaySvg /></a>
              <a href=""><AppStoreSvg /></a>
            </div>
          </div>
          <div>

          </div>
        </div>
      </section>
      <section className='my-20'>
        <div className="flex items-center gap-3 justify-between">
          <h3 className='title-h3'>Новинки</h3>
          <Link to="/catalog/news" className="text-red-light font-medium flex items-center gap-2">
            <span>К новинкам</span>
            <ArrowSvg color="#FF4D4D" />
          </Link>
        </div>
        {isMobile ? (
          <Swiper
            className='mt-5'
            slidesPerView={2}
            spaceBetween={16}
            breakpoints={{
              680: {
                slidesPerView: 3,
              },
              480: {
                slidesPerView: 2,
              },
              320: {
                slidesPerView: 1,
              },
            }}
          >
            {newProducts?.slice(0, 10).map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 gap-5">
            {newProducts?.slice(0, 10).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      <section className="px-4 py-8">
        <div className="flex items-center justify-between">
          <h2 className="title-h3">Обзоры</h2>
          <Link to='/reviews' className='flex items-center text-red-light'>
            <span>К обзорам</span>
            <ArrowSvg />
          </Link>
        </div>
        {isMobile ? (
          <Swiper
            className='mt-5'
            slidesPerView={2}
            spaceBetween={15}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
              480: {
                slidesPerView: 2,
              },
              320: {
                slidesPerView: 1,
              },
            }}
          >
            {reviews?.length && reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}

          </Swiper>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
            {reviews?.length && reviews.map((review) => <ReviewCard review={review} key={review.id} />)}
          </div>
        )}

      </section>
    </Page >
  )
}

export default Home
