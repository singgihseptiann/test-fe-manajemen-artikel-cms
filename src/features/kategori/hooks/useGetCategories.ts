import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/service/service";
import { usePagination } from "@/context/pagination.context";

export const useGetCategories = () => {
  const { page, limit } = usePagination();

  return useQuery({
    queryKey: ["get-categories", page],
    queryFn: () => api.get("categories", { page, limit }),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDeleteCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete("get-categories", id),
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
