import api from "@/service/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.put("categories", id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      alert("Categories berhasil diperbarui!");
    },
    onError: (error) => {
      console.error("Error:", error);
      alert("Terjadi kesalahan, coba lagi nanti!");
    },
  });
};
