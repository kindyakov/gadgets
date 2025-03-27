import { useQuery } from "@tanstack/react-query";
import services from "../settings/services.js";
import { checkSearchParams } from "../utils/checkSearchParams.js";

export function useBrands(searchParams = {}, extraOptions = {}) {
  return useQuery({
    queryKey: ['brands', JSON.stringify(searchParams)],
    queryFn: () => services.getBrands(searchParams),
    enabled: checkSearchParams(searchParams),
    staleTime: 1000 * 60 * 5,
    ...extraOptions
  });
}
