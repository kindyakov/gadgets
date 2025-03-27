import { useQuery } from "@tanstack/react-query";
import services from "../settings/services.js";
import { checkSearchParams } from "../utils/checkSearchParams.js";

export function useReviews(searchParams = {}, extraOptions = {}) {
  return useQuery({
    queryKey: ['reviews', JSON.stringify(searchParams)],
    queryFn: () => services.getReviews(searchParams),
    enabled: checkSearchParams(searchParams),
    staleTime: 1000 * 60 * 5,
    ...extraOptions
  });
}
