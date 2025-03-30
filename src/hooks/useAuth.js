import { useMutation } from "@tanstack/react-query";
import services from "../settings/services.js";
import { handleAuthSuccess } from "../helpers/authHelpers.js";
import { useUserStore } from "../store/useUserStore.js";

export function useAuth() {
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['auth'],
    mutationFn: async (data) => services.auth(data),
    onSuccess: data => handleAuthSuccess(data, login),
    onError: error => console.error('Ошибка при авторизации:', error)
  });
}