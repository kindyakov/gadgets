import { useQuery } from "@tanstack/react-query";
import services from "../settings/services.js";

export function useProfile(isAuth = false) {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => services.getProfile(),
    enabled: isAuth
  })
}