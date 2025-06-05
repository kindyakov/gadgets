import { useQuery } from "@tanstack/react-query";
import services from "../settings/services.js";
import { checkSearchParams } from "../utils/checkSearchParams.js";

export function useSubCategories(searchParams = {}, extraOptions = {}) {
  return useQuery({
    queryKey: ['subCategories', JSON.stringify(searchParams)],
    queryFn: () => services.getSubCategory(searchParams),
    // enabled: checkSearchParams(searchParams),
    staleTime: 1000 * 60 * 5,
    ...extraOptions
  });
}
