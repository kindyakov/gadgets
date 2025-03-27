import Loader from '../Loader/Loader';

const ProductAddCart = ({ product = {}, className = '' }) => {
  if (Object.keys(product).length === 0) {
    return ''
  }

  return (
    <button className={`button whitespace-nowrap mt-2 py-3 relative ${className}`}>
      <span className="">Добавить в корзину</span>
      <Loader width={30} height={30} className='opacity-0 invisible' />
    </button>
  )
}

export default ProductAddCart