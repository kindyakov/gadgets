import { useQuery } from "@tanstack/react-query";
import services from "../settings/services.js"; // корректируйте путь при необходимости

export function useCategories(searchParams = {}, extraOptions = {}) {
  return useQuery({
    queryKey: ['categories', JSON.stringify(searchParams)],
    queryFn: () => services.getCategories(searchParams),
    staleTime: 1000 * 60 * 5,
    ...extraOptions
  });
}
