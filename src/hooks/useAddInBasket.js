import { useMutation } from "@tanstack/react-query";
import services from "../settings/services.js";
import { useUserStore } from "../store/useUserStore.js";
import { useQueryClient } from '@tanstack/react-query';

export function useAddInBasket() {
  const { addToBasket } = useUserStore()
  const { invalidateQueries } = useQueryClient();

  return useMutation({
    mutationKey: ['add-with-basket'],
    mutationFn: async (product) => services.addInBasket(product.id, { quantity: product.quantity }),
    onSuccess: (data, product) => {
      if (data && data.status === 'success') {
        addToBasket(product)
        invalidateQueries(['basket'])
      }
    },
    onError: error => console.error('Ошибка при добавлении товара в корзину:', error)
  });

}