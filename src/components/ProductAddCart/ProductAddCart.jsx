import { useState, useEffect } from "react";
import { useModalStore } from "../../store/useModalStore"
import { useUserStore } from "../../store/useUserStore"
import { useAddWithBasket } from '../../hooks/useAddWithBasket';
import Button from "../../ui/Button"

const ProductAddCart = ({ product = {}, className = '' }) => {
  const { openModal } = useModalStore()
  const { isAuth, checkProductInBasket } = useUserStore()
  const isProductInBasket = checkProductInBasket(product.id)
  const { mutate, isPending, } = useAddWithBasket()
  const [isClickBtn, setIsClickBtn] = useState(false)

  const handleClick = () => {
    if (!isAuth) {
      openModal('modalAuth')
      setIsClickBtn(true)
    } else {
      mutate(product)
      setIsClickBtn(false)
    }
  }

  useEffect(() => {
    if (isClickBtn && isAuth) {
      mutate(product)
      setIsClickBtn(false)
    }
  }, [isAuth])


  return (
    <Button
      className={`button whitespace-nowrap mt-2 py-3 relative ${className}`}
      onClick={handleClick}
      disabled={isPending || isProductInBasket}
      isLoading={isPending}
      isLoader={true}
    >
      {isProductInBasket ? 'В корзине' : 'Добавить в корзину'}
    </Button>
  )
}

export default ProductAddCart