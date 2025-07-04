import { useMutation } from "@tanstack/react-query";
import services from "../settings/services.js";

export function useSearch() {
  return useMutation({
    mutationKey: ['search'],
    mutationFn: (params) => services.search(params),
    onError: error => console.error('Ошибка при поиске:', error)
  })
}