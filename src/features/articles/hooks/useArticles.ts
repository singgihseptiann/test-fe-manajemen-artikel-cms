import { useQuery } from "@tanstack/react-query";
import api from "@/service/service";
import { usePagination } from "@/context/pagination.context";

export const useArticles = () => {
  const { page, limit } = usePagination();

  return useQuery({
    queryKey: ["articles", page],
    queryFn: () => api.get("articles", { page, limit }),
    staleTime: 5 * 60 * 1000,
  });
};
