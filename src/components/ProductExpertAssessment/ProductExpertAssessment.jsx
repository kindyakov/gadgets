const ProductExpertAssessment = ({ product = {} }) => {
  if (Object.keys(product).length === 0) {
    return ''
  }

  const expertAssessmentColors = (rating) => {
    if (rating >= 4) {
      return { backgroundColor: '#cff1e6', color: '#46d16d' }
    } else if (rating >= 3) {
      return { color: '#efbb34', backgroundColor: '#fcf1d6' }
    } else {
      return { color: '#ff4d4d', backgroundColor: '#ffdbdb' }
    }
  }

  return (
    <p className="rounded-lg px-2" style={expertAssessmentColors(product.expertAssessment)}>
      Оценка эксперта <span>{product.expertAssessment}</span>
    </p>
  )
}

export default ProductExpertAssessment