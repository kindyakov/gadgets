import { useQuery } from "@tanstack/react-query";
import services from "../settings/services.js";

export function useOrder(id) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => services.getOrder(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id
  })
}

export function useOrders() {
  return useQuery({
    queryKey: ['order'],
    queryFn: () => services.getOrders(),
    staleTime: 1000 * 60 * 5,
  })
}