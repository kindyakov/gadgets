import { useQuery } from "@tanstack/react-query";
import services from "../settings/services.js";
import { checkSearchParams } from "../utils/checkSearchParams.js";

export function useFeedbacks(searchParams = {}, extraOptions = {}) {
  return useQuery({
    queryKey: ['feedbacks', JSON.stringify(searchParams)],
    queryFn: () => services.getFeedbacks(searchParams),
    staleTime: 1000 * 60 * 10,
    enabled: checkSearchParams(searchParams),
    ...extraOptions
  });
}