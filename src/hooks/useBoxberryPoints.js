import { useQuery } from "@tanstack/react-query";
import services from "../settings/services.js";
import { checkSearchParams } from "../utils/checkSearchParams.js";

export function useBoxberryPoints(searchParams) {
  return useQuery({
    queryKey: ['boxberry-points', searchParams],
    queryFn: () => services.getBoxberryPoints(searchParams),
    enabled: checkSearchParams(searchParams),
  })
}