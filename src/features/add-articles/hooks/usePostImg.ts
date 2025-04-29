import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "@/service/uploadImage";
import { useImageContext } from "@/context/image.context";

export const usePostImg = () => {
  const queryClient = useQueryClient();
  const { setImageUrl } = useImageContext();

  return useMutation<any, Error, FormData>({
    mutationFn: (data: FormData) => uploadImage("upload", data),
    onSuccess: (data) => {
      console.log("Upload sukses", data);
      alert("Gambar berhasil diupload!");
      const imageUrl = data?.imageUrl;
      setImageUrl(imageUrl); // Simpan imageUrl di context
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error) => {
      console.error("Error upload gambar:", error);
      alert("Gagal upload gambar, coba lagi nanti!");
    },
  });
};
