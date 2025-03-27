import { useQuery } from "@tanstack/react-query";
import services from "../settings/services.js";
import { checkSearchParams } from "../utils/checkSearchParams.js";

export function useProducts(searchParams = {}, extraOptions = {}) {
  return useQuery({
    queryKey: ['products', JSON.stringify(searchParams)],
    queryFn: () => services.getProducts(searchParams),
    enabled: checkSearchParams(searchParams),
    staleTime: 1000 * 60 * 5,
    ...extraOptions
  });
}
