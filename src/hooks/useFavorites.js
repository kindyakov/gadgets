import { useQuery } from "@tanstack/react-query";
import services from "../settings/services.js";

export function useBasket() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => services.getFavorites(),
    staleTime: 1000 * 60 * 5,
  })
}