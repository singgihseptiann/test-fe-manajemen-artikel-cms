import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import userAuth from "@/service/auth";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      userAuth.post("login", data),

    onSuccess: (response) => {
      localStorage.setItem("user_token", response.token);
      alert("Login berhasil!");
      router.push("/home");
    },

    onError: (error: any) => {
      console.error("Login error:", error);
      alert("Login gagal. Periksa username dan password kamu.");
    },
  });
}
