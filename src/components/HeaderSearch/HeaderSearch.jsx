import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import ProductCard from '../ProductCard/ProductCard'
import ArticleHeader from '../ArticleHeader/ArticleHeader';
import OftenSearch from '../OftenSearch/OftenSearch';
import { useHeaderStore } from '../../store/useHeaderStore';

const HeaderSearch = () => {
  const { isSearchOpen, headerHeight, searchResult } = useHeaderStore()

  return (
    <div
      className={`header__search absolute z-10 left-0 right-0 w-ful bg-[#fdfdfd] ${isSearchOpen ? '_open' : ''}`}
      style={{ top: `${headerHeight + 1}px` }}
    >
      <div className="header__search_body container bg-white flex flex-col gap-5 py-5">
        <Swiper
          className="w-full"
          modules={[Navigation]}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={5}
        >
          {searchResult?.hits.length ? searchResult?.hits.length.map(product => (
            <SwiperSlide className="my-auto flex items-center justify-center p-2" key={product.id}>
              {/* {searchResult?.hits.length && <ProductCard product={searchResult.hits.map(obj => obj.document)} />} */}
            </SwiperSlide>
          )) : ''}

        </Swiper>
        <div className="flex gap-5">
          <div className="w-2/5">
            <h4 className='text-xl font-semibold text-[#263141]'>Обзоры</h4>
            <div className="flex flex-col gap-3 mt-3">
              <ArticleHeader />
            </div>
          </div>

          <div className="w-1/3">
            <h4 className='text-xl font-semibold text-[#263141]'>Часто ищут</h4>
            <OftenSearch />
          </div>

        </div>
      </div>
    </div>
  )
}

export default HeaderSearch