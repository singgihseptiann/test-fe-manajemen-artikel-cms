import api from "@/service/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetArticlesById = (id: string) => {
  return useQuery({
    queryKey: ["articlesById", id],
    queryFn: () => api.getById("articles", id),
    staleTime: 5 * 60 * 1000,
  });
};

export const useEditArticles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.put("articles", id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      alert("Artikel berhasil diperbarui!");
    },
    onError: (error) => {
      console.error("Error:", error);
      alert("Terjadi kesalahan, coba lagi nanti!");
    },
  });
};
