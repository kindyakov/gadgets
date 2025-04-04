import { useState, useEffect } from "react";
import { useModalStore } from "../../store/useModalStore"
import { useUserStore } from "../../store/useUserStore"
import { useAddInBasket } from '../../hooks/useAddInBasket';
import Button from "../../ui/Button"
import { Link } from "react-router-dom";

const ProductAddBasket = ({ product = {}, className = '' }) => {
  const { openModal } = useModalStore()
  const { isAuth, checkProductInBasket } = useUserStore()
  const isProductInBasket = checkProductInBasket(product.id)
  const { mutate, isPending, } = useAddInBasket()
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
    <>
      {isProductInBasket ? (
        <Link to='/account/basket' className="button whitespace-nowrap block mt-2 py-3 bg-yellow-light">Перейти в корзину</Link>
      ) : (
        <Button
          className={`button whitespace-nowrap mt-2 py-3 relative ${className}`}
          onClick={handleClick}
          disabled={isPending || isProductInBasket}
          isLoading={isPending}
          isLoader={true}
        >
          Добавить в корзину
        </Button>
      )}
    </>
  )
}

export default ProductAddBasket