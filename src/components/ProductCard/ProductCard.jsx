import { Link } from "react-router-dom"
import { formatCurrency } from '../../utils/formatCurrency';
import { TriangleSvg } from '../../ui/svg/TriangleSvg';
import ProductActions from '../ProductActions/ProductActions';

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col lg:gap-5 gap-3 bg-[#f6f7fa] p-5 rounded-xl border-[#f2f5f9] border-solid border-[1px] group h-fit">
      <Link to={`/${product?.slug}`} className="w-full flex items-center justify-center overflow-hidden lg:h-40 h-32">
        <img src={`${product?.images[0]}`} alt={product?.title} className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105" />
      </Link>
      <div className="flex flex-col flex-grow">
        <span className='text-[#7e8794] lg:text-sm text-[12px] font-normal'>Смартфоны</span>
        <Link to={`/${product?.slug}`} className='font-semibold lg:text-xl text-[16px]'>{product?.title}</Link>

        <div className="flex justify-between mt-auto">
          <div className=''>
            <div className='flex items-center gap-1'>
              <span className='text-[#7e8794] lg:text-sm text-[12px] font-normal'>Цена</span>
              {product?.oldPrice && product?.price && (
                <div
                  className={`flex items-center gap-[2px] ${product.price > product.oldPrice ? 'text-[#ff3b30]' : 'text-[#30d170]'}`}>
                  <TriangleSvg
                    className={`transition-transform ${product.price > product.oldPrice ? 'rotate-180' : ''}`}
                  />
                  <span className='font-normal'>
                    {Math.abs(
                      Math.round(
                        ((product.price - product.oldPrice) / product.oldPrice) * 100
                      )
                    )}%
                  </span>
                </div>
              )}
            </div>
            <b>{formatCurrency(product?.price)}</b>
          </div>

          <ProductActions product={product} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard