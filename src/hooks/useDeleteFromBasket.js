import { useMutation } from "@tanstack/react-query";
import services from "../settings/services.js";
import { useUserStore } from "../store/useUserStore.js";

export function useDeleteFromBasket() {
  const { deleteFromBasket } = useUserStore()

  return useMutation({
    mutationKey: ['delete-from-basket'],
    mutationFn: async (products) => services.deleteFromBasket(products.map(p => p.id)),
    onSuccess: (data, products) => {
      if (data && data.status === 'success') {
        deleteFromBasket(products.map(p => p.id))
      }
    },
    onError: error => console.error('Ошибка при удалении товара из корзины:', error),
  });
}