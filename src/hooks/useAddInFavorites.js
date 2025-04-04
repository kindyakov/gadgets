import { useMutation } from "@tanstack/react-query";
import services from "../settings/services.js";
import { useUserStore } from "../store/useUserStore.js";
import { useQueryClient } from '@tanstack/react-query';

export function useAddInFavorites() {
  const { toggleFavorite } = useUserStore()
  const { invalidateQueries } = useQueryClient();

  return useMutation({
    mutationFn: async (product) => services.toggleFavorite(product.id),
    onSuccess: (data, product) => {
      if (data && data.status === 'success') {
        toggleFavorite(product)
        invalidateQueries(['favorites'])
      }
    },
    onError: (error) => console.error('Ошибка при обновлении избранных товаров:', error),
  });
}