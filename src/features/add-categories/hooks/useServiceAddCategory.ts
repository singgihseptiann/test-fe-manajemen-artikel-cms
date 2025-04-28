import api from "@/service/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface categoriesData {
  name: string;
}
export const useServiceAddCategoryForm = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, categoriesData>({
    mutationFn: (data) => api.post("categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      alert("Categories berhasil ditambahkan!");
    },
    onError: (error) => {
      console.error("Error:", error);
      alert("Terjadi kesalahan, coba lagi nanti!");
    },
  });
};
