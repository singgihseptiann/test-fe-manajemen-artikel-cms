import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useDeleteArticles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete("articles", id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      alert("Artikel berhasil dihapus");
    },
    onError: (error) => {
      console.error("Error:", error);
      alert("Terjadi kesalahan, coba lagi nanti!");
    },
  });
};
