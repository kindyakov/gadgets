import { useMutation } from "@tanstack/react-query";
import services from "../settings/services.js";
import { useUserStore } from "../store/useUserStore.js";

export function useAddInBasket() {
  const { addToBasket } = useUserStore()

  return useMutation({
    mutationKey: ['add-in-basket'],
    mutationFn: async (product) => services.addInBasket(product.id, { quantity: product.quantity }),
    onSuccess: (data, product) => {
      if (data && data.status === 'success') {
        addToBasket(product)
      }
    },
    onError: error => console.error('Ошибка при добавлении товара в корзину:', error)
  });
}