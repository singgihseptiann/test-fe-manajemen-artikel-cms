import api from "@/service/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface ArticleData {
  title: string;
  categoryId: string;
  thumbnail?: File | null;
  content: string;
}

export const useServiceArticlesForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, ArticleData>({
    mutationFn: (data) => api.post("articles", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      alert("Artikel berhasil ditambahkan!");
      router.push("/articles");
    },
    onError: (error) => {
      console.error("Error:", error);
      alert("Terjadi kesalahan, coba lagi nanti!");
    },
  });
};
