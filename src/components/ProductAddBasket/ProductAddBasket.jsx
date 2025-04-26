import { useEffect } from "react";
import { useModalStore } from "../../store/useModalStore"
import { useUserStore } from "../../store/useUserStore"
import { useAddInBasket } from '../../hooks/useAddInBasket';
import Button from "../../ui/Button"
import { Link } from "react-router-dom";

const ProductAddBasket = ({ product = {}, className = '' }) => {
  const { mutate, isPending } = useAddInBasket()
  const openModal = useModalStore(state => state.openModal);
  const { isAuth, checkProductInBasket } = useUserStore();
  const isProductInBasket = checkProductInBasket(product.id)

  const handleClick = () => {
    if (!isAuth) {
      openModal('modalAuth', {
        onSuccess: () => mutate(product)
      })
    } else {
      mutate(product)
    }
  }

  return (
    <>
      {
        isProductInBasket ? (
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
        )
      }
    </>
  )
}

export default ProductAddBasket