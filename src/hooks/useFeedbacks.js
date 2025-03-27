import { useQuery } from "@tanstack/react-query";
import services from "../settings/services.js";

export function useFeedbacks(productId = null, extraOptions = {}) {
  return useQuery({
    queryKey: ['feedbacks', productId],
    queryFn: () => services.getFeedbacks(productId),
    staleTime: 1000 * 60 * 5,
    enabled: !!productId,
    ...extraOptions
  });
}