import ProductRating from "../ProductRating/ProductRating"

const FeedbackItem = ({ feedback }) => {
  return (
    <div className="flex flex-col gap-4 p-5 rounded-xl bg-[#f6f7fa]">
      <div className="flex justify-between items-start gap-3">
        <div className="">
          <h4 className="text-xl font-semibold">{feedback.user.name} {feedback.user.surname}</h4>
          <span className="text-sm">{feedback.createdAt}</span>
        </div>

        <ProductRating product={feedback} isOnlyStars={true} />
      </div>

      <div className="">
        <h5 className="text-lg font-medium">Достоинства</h5>
        <p className="text-base text-[#8b96a3]">{feedback.dignities}</p>
      </div>

      <div className="">
        <h5 className="text-lg font-medium">Недостатки</h5>
        <p className="text-base text-[#8b96a3]">{feedback.disadvantages}</p>
      </div>

      <div className="">
        <h5 className="text-lg font-medium">Комментарий</h5>
        <p className="text-base text-[#8b96a3]">{feedback.comment}</p>
      </div>
    </div>
  )
}

export default FeedbackItem