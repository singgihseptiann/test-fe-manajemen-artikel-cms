import userAuth from "@/service/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { username: string; password: string; role: string }) =>
      userAuth.post("register", data),

    onSuccess: (response) => {
      localStorage.setItem("user_username", response.username);
      localStorage.setItem("user_password", response.password);
      localStorage.setItem("user_role", response.role);
      alert("Registrasi berhasil!");
      router.push("/articles");
    },

    onError: (error: any) => {
      console.error("Register error:", error);
      alert("Registrasi gagal. Silakan coba lagi.");
    },
  });
}
