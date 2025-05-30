import { useMutation } from "@tanstack/react-query";
import services from "../settings/services.js";

export function useCreatePayment() {
  return useMutation({
    mutationKey: ['create-payment'],
    mutationFn: async (data) => services.createPayment(data),
    onSuccess: (data) => {
      const { redirect_url } = data
      if (redirect_url) {
        location.href = redirect_url
      }
    },
    onError: error => console.error('Ошибка при создании платежа:', error)
  });
}