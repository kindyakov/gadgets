import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Link } from "react-router-dom"
import { formatCurrency } from '../../utils/formatCurrency';

import ProductRating from '../ProductRating/ProductRating';
import ProductExpertAssessment from '../ProductExpertAssessment/ProductExpertAssessment';
import ProductActions from '../ProductActions/ProductActions';
import ProductAddBasket from '../ProductAddBasket/ProductAddBasket';
import ProductCardSlider from '../ProductImageSlider/ProductImageSlider'

const ProductCardRow = ({ product }) => {
  const statusColor = {
    available: '#46d16d',
    sold_out: '#ff4d4d',
    pre_order: '#FFDF39'
  }

  const path = '/catalog' + product.path;

  return (
    <div className="flex gap-4 justify-between p-5 rounded-xl border-solid border-[1px] border-[#ebf0f7]">
      <ProductCardSlider product={product} path={path} />
      <div className="flex-auto">
        <div className="flex justify-between gap-4">
          <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
            {product.tags.length
              ? product.tags.map(tag => <span key={tag + product.id} className="text-xs text-[#464646] py-1 px-2 rounded-lg bg-[#ebf0f7] font-verdana">{tag}</span>)
              : ''}
          </div>
          <ProductActions product={product} />
        </div>
        <Link to={path} className="text-2xl font-semibold text-[#0f1113] mt-2">{product.title}</Link>
        <ProductRating product={product} />
        <ul className="grid grid-cols-2 gap-x-2 gap-y-1  mt-2">
          {product.specifications?.length
            ? product.specifications.map(spec => (
              <li key={spec.name + product.id}>
                <b className="font-semibold text-[#7c7c7c] text-sm">{spec.name}:</b>
                <p className="inline ml-2 text-[14px]">{spec.value}</p>
              </li>
            ))
            : ''}
        </ul>
      </div>
      <div className="flex flex-col min-w-[200px]">
        <div className="w-full flex flex-col gap-1 text-sm text-[#7c7c7c] font-medium items-start">
          <p className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full inline-block"
              style={{
                backgroundColor: statusColor[product.status.type] || 'red'
              }}></span>
            <span>{product.status.name}</span>
          </p>
          <p>Артикул: {product.article}</p>
          <ProductExpertAssessment product={product} />
        </div>
        <div className="mt-auto flex justify-between gap-2 items-end">
          <b>{formatCurrency(product.price)}</b>
          <span className="line-through text-[#7c7c7c] text-xs">{formatCurrency(product.oldPrice)}</span>
        </div>

        <ProductAddBasket product={product} />
      </div>
    </div>
  )
}

export default ProductCardRow