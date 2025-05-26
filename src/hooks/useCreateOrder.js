import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import services from "../settings/services.js";
import { useUserStore } from "../store/useUserStore.js";

export function useCreateOrder() {
  const navigate = useNavigate()
  const deleteFromBasket = useUserStore(state => state.deleteFromBasket)

  return useMutation({
    mutationKey: ['create-order'],
    mutationFn: async (products) => services.createOrder(products.map(p => ({ id: p.id, quantity: p.quantity }))),
    onSuccess: (data, products) => {
      const { status, message, orderId } = data
      toast[status](message, { duration: 3000, })
      if (status === 'success') {
        deleteFromBasket(products.map(p => p.id))
        navigate(`/order-registration?orderId=${orderId}`)
      }
    },
    onError: error => console.error('Ошибка при создании заказа:', error),
  });
}