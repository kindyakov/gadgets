import { useState } from 'react'
import ProductRating from "../ProductRating/ProductRating"
import FeedbackItem from "../FeedbackItem/FeedbackItem"
import { declOfNum } from "../../utils/declOfNum"
import Select from 'react-select';

const ProductFeedback = ({ feedbacks, distribution, rating }) => {
  const localDistribution = Object.entries(distribution).reverse()
  const options = [
    { value: '1', label: 'Сначала полезные' },
    { value: '2', label: 'Сначала новые' },
    { value: '3', label: 'Сначала с низкой оценкой' },
    { value: '4', label: 'Сначала с высокой оценкой' },
  ]
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="flex gap-5 mt-10 items-start" id='reviews'>
      <div className="w-3/5">
        <div className="flex justify-between gap-3">
          <h3 className='text-2xl font-bold relative'>
            Отзывы покупателей
            <span className='absolute text-xs left-full -top-2 ml-1 font-medium p-1 rounded-[4px] bg-[#ffeaea]'>{feedbacks?.length}</span>
          </h3>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className="flex flex-col gap-5 mt-5">
          {feedbacks?.length && feedbacks.map(feedback => (
            <FeedbackItem key={feedback.id} feedback={feedback} />
          ))}
        </div>
      </div>
      <div className="w-2/5 flex justify-center py-5 bg-[#F5F9FD] rounded-2xl">
        <div className="flex flex-col items-center px-5">
          <h5>Общий рейтинг</h5>
          <b className='flex-auto text-center flex items-center justify-center text-4xl font-bold'>
            {rating}
          </b>
          <div className="flex flex-col items-center gap-1">
            <ProductRating product={{ rating }} isOnlyStars={true} />

            <p className='text-center text-sm text-[#7c7c7c] leading-[120%]'>
              {feedbacks?.length
                ? (
                  <>
                    На основании
                    <br />
                    {feedbacks.length} {declOfNum(feedbacks.length, ['оценки', 'оценок', 'оценок'])}
                  </>
                )
                : ''}
            </p>
          </div>
        </div>
        <div className="px-5">
          <ul className="flex flex-col">
            {localDistribution.length && localDistribution.map(([n, obj]) => (
              <li className='flex items-center gap-2' key={n}>
                <span className='w-2'>{n}</span>
                <div className="flex-auto h-2 rounded relative bg-red-light-100 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-red-light h-full rounded"
                    style={{ width: `${obj.percentage}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
          <button className='button py-2 mt-3'>Оставить отзыв</button>
        </div>
      </div>
    </div>
  )
}

export default ProductFeedback