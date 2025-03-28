import { useState, useEffect } from 'react'
import Select from 'react-select';
import ProductRating from "../ProductRating/ProductRating"
import FeedbackItem from "../FeedbackItem/FeedbackItem"
import { declOfNum } from "../../utils/declOfNum"
import { useFeedbacks } from '../../hooks/useFeedbacks';
import Loader from '../Loader/Loader';

const options = [
  { value: 'newest', label: 'Сначала новые' },
  { value: 'low_rating', label: 'Сначала с низкой оценкой' },
  { value: 'high_rating', label: 'Сначала с высокой оценкой' },
];

const ProductFeedback = ({ productId }) => {
  const [_page, setPage] = useState(1);
  const [sort, setSort] = useState(options[0].value);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { data, isLoading } = useFeedbacks({ productId, _page, _limit: 5, sort })
  const [feedbacks, setFeedbacks] = useState([])
  const [distribution, setDistribution] = useState([])

  useEffect(() => {
    if (data) {
      setFeedbacks(prev => {
        const newFeedbacks = data.feedbacks.filter(
          newFeedback => !prev.some(oldFeedback => oldFeedback.id === newFeedback.id)
        );
        return [...prev, ...newFeedbacks];
      })

      setDistribution(Object.entries(data.distribution).reverse())
    }
  }, [data]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleSortChange = (option) => {
    setSelectedOption(option);
    setSort(option.value)
    setPage(1)
    setFeedbacks([]);
  };

  return (
    <div className="flex gap-5 mt-10 items-start" id='reviews'>
      <div className="w-3/5">
        <div className="flex justify-between gap-3">
          <h3 className='text-2xl font-bold relative'>
            Отзывы покупателей
            <span className='absolute text-xs left-full -top-2 ml-1 font-medium p-1 rounded-[4px] bg-[#ffeaea]'>{data?.meta?.totalItems}</span>
          </h3>
          {feedbacks.length > 0
            ? <Select
              defaultValue={selectedOption}
              onChange={handleSortChange}
              options={options}
            />
            : null}
        </div>
        <div className="flex flex-col gap-5 mt-5 min-h-80 relative">
          {feedbacks.length === 0 && isLoading ? <Loader color='#FF4D4D' /> : null}
          {feedbacks.length > 0
            ? feedbacks.map(feedback => (
              <FeedbackItem key={feedback.id} feedback={feedback} />
            ))
            : null
          }
          {feedbacks.length === 0 && !isLoading
            ? <div className='flex items-center justify-center min-h-60'>
              <p className='text-xl'>Нет отзывов</p>
            </div>
            : null}
        </div>
        <button
          className="button block w-fit mx-auto relative"
          onClick={handleLoadMore}
          disabled={!data?.meta?.hasNextPage || isLoading}
        >
          <Loader className={`transition-opacity ${isLoading ? '' : 'opacity-0'}`} />
          <span className={`${isLoading ? 'opacity-0' : ''}`}>Показать ещё</span>
        </button>
      </div>

      <div className="w-2/5 flex justify-center py-5 bg-[#F5F9FD] rounded-2xl min-h-52">
        {data?.rating
          ? (
            <div className="flex flex-col items-center px-5">
              <h5>Общий рейтинг</h5>
              <b className='flex-auto text-center flex items-center justify-center text-4xl font-bold'>
                {data?.rating}
              </b>
              <div className="flex flex-col items-center gap-1">
                <ProductRating product={{ rating: data.rating }} isOnlyStars={true} />

                <p className='text-center text-sm text-[#7c7c7c] leading-[120%]'>
                  {data?.meta?.totalItems
                    ? (
                      <>
                        На основании
                        <br />
                        {data?.meta?.totalItems} {declOfNum(data?.meta?.totalItems, ['оценки', 'оценок', 'оценок'])}
                      </>
                    )
                    : ''}
                </p>
              </div>
            </div>
          )
          : null}
        <div className="px-5">
          <ul className="flex flex-col">
            {distribution?.length && distribution.map(([n, obj], i) => (
              <li className='flex items-center gap-2' key={n + i}>
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