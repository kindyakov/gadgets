import './styles.scss'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useProducts } from "../../../hooks/useProducts";
import { useBrands } from "../../../hooks/useBrands";
import { useFeedbacks } from '../../../hooks/useFeedbacks';
import { formatCurrency } from '../../../utils/formatCurrency';
import Loader from "../../../components/Loader/Loader";

import ProductSlider from '../../../components/ProductSlider/ProductSlider';
import ProductRating from "../../../components/ProductRating/ProductRating";
import ProductExpertAssessment from "../../../components/ProductExpertAssessment/ProductExpertAssessment";
import ProductActions from "../../../components/ProductActions/ProductActions";
import ProductAddCart from "../../../components/ProductAddCart/ProductAddCart";
import ProductVariants from "../../../components/ProductVariants/ProductVariants";
import FeedbackItem from '../../../components/FeedbackItem/FeedbackItem';
import { useBreadcrumbStore } from "../../../store/useBreadcrumbStore";
import { declOfNum } from '../../../utils/declOfNum';
import ProductFeedback from '../../../components/ProductFeedback/ProductFeedback';

const ProductPage = ({ slug, segments }) => {
  const [category, subcategory, product] = segments
  const { setBreadcrumbName } = useBreadcrumbStore()

  const { data, isLoading, error, isSuccess } = useProducts({ slug: product }, {
    select: (data) => data ? data[0] : {},
  })

  const { data: brand, } = useBrands({ id: data?.brandId }, {
    select: (data) => data ? data[0] : {},
    enable: !!data?.brandId
  })

  const { data: feedbacksData } = useFeedbacks(data?.id)

  useEffect(() => {
    if (data) {
      setBreadcrumbName(data.slug, data.title)
    }
  }, [data]);

  if (isLoading) {
    return (
      <div>Загрузка...</div>
    )
  }

  return (
    <>
      <div className="flex gap-5 mt-5">
        <div
          className="w-2/4 rounded-xl p-5 flex flex-col gap-5 border">
          <ProductSlider product={data} />
        </div>
        <div className="w-2/4 rounded-xl p-5 border relative">
          <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-2">
            {brand ? (
              <Link className="">
                <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
              </Link>
            ) : ''}
            <ProductActions product={data} />
          </div>

          <h1 className="text-4xl font-bold mt-5">{data.title}</h1>

          <div className=" flex gap-x-4 items-center mt-5 flex-wrap gap-y-2">
            <ProductExpertAssessment product={data} />
            <div className="px-2 py-1 rounded bg-[#f6f7fa]">
              <ProductRating product={data} />
            </div>
          </div>

          <ProductVariants variants={data.variants} features={data.features} slug={data.slug} />

          <div className="flex items-end gap-3 mt-5">
            <b className="text-2xl font-bold">{formatCurrency(data.price)}</b>
            <span className="line-through text-[#7c7c7c] text-xl">{formatCurrency(data.oldPrice)}</span>
          </div>

          <ProductAddCart product={data} className='w-full text-xl' />
        </div>

      </div>

      <div className="flex gap-5 mt-5">
        <div className="w-2/4">
          <h3 className='text-2xl font-bold'>Описание</h3>
          <p className='text-xl mt-3'>
            {data.fullDescription}
          </p>
        </div>
        <div className="w-2/4">
          <h3 className='text-2xl font-bold'>Характеристики</h3>
          <dl className='flex flex-col w-full  mt-3'>
            {data.specifications.map((specification) => (
              <div
                key={specification.name}
                className='w-full flex justify-between py-2 px-3 odd:bg-[#F5F9FD]'
              >
                <dt className='font-medium text-[#7e8794]'>{specification.name}</dt>
                <dd className='font-medium text-[#263141]'>{specification.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {feedbacksData && <ProductFeedback feedbacks={feedbacksData.feedbacks} distribution={feedbacksData.distribution} rating={data.rating} />}
    </>
  )
}

export default ProductPage