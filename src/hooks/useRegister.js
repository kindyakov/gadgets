import { useMutation } from "@tanstack/react-query";
import services from "../settings/services.js";
import { handleAuthSuccess } from "../helpers/authHelpers.js";
import { useUserStore } from "../store/useUserStore.js";

export function useRegister() {
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (data) => services.register(data),
    onSuccess: data => handleAuthSuccess(data, login),
    onError: error => console.error('Ошибка при регистрации:', error)
  })
}