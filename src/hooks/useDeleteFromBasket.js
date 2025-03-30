import { useMutation } from "@tanstack/react-query";
import services from "../settings/services.js";
import { useUserStore } from "../store/useUserStore.js";

export function useDeleteFromBasket() {
  const { deleteFromBasket } = useUserStore()

  return useMutation({
    mutationKey: ['Delete-from-basket'],
    mutationFn: async (productId) => services.deleteFromBasket(productId),
    onSuccess: (data, productId) => {
      if (data && data.status === 'success') {
        deleteFromBasket(productId)
      }
    },
    onError: error => console.error('Ошибка при удалении товара из корзины:', error)
  });
}