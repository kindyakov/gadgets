import { useMutation } from "@tanstack/react-query";
import services from "../settings/services.js";
import { useUserStore } from "../store/useUserStore.js";

export function useAddWithBasket() {
  const { addToBasket } = useUserStore()

  return useMutation({
    mutationKey: ['add-with-basket'],
    mutationFn: async (product, data = {}) => services.addWithBasket(product.id, data),
    onSuccess: (data, product) => {
      if (data && data.status === 'success') {
        addToBasket(product)
      }
    },
    onError: error => console.error('Ошибка при добавлении товара в корзину:', error)
  });

}