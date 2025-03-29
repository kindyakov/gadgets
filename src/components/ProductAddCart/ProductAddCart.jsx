import Loader from '../Loader/Loader';
import { useModalStore } from "../../store/useModalStore"

const ProductAddCart = ({ product = {}, className = '' }) => {
  const { modals, openModal, closeModal } = useModalStore()

  return (
    <button
      className={`button whitespace-nowrap mt-2 py-3 relative ${className}`}
      onClick={() => openModal('modalAuth')}>
      <span className="">Добавить в корзину</span>
      <Loader width={30} height={30} className='opacity-0 invisible' />
    </button>
  )
}

export default ProductAddCart