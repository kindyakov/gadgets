import { useParams } from "react-router-dom"
import Page from "../Page"
import ReviewPage from "./ReviewPage/ReviewPage"

const Reviews = () => {
  const { "*": slug } = useParams()
  const segments = slug.split("/").filter(segment => segment)

  return (
    <Page>
      <ReviewPage segments={segments} />
    </Page>
  )
}

export default Reviews