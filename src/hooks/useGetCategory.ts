import api from "@/service/service";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("categories"),
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
  });
};
