import { useQuery } from "@tanstack/react-query";
import userAuth from "@/service/auth";

export function useGetUserProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => userAuth.get("profile"),
    refetchOnWindowFocus: true,
  });
}
