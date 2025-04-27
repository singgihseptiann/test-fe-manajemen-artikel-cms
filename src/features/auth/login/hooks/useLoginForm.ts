import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "./useLogin";
import userAuth from "@/service/auth";
import { useState } from "react";

const FormSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Please enter your username" })
    .min(3, { message: "Username must be at least 3 characters." }),
  password: z
    .string()
    .min(1, { message: "Please enter your password" })
    .min(8, { message: "Password must be at least 8 characters." }),
});

export function useLoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await loginMutation.mutateAsync(data);
      return response;
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: loginMutation.isPending,
    showPassword,
    togglePasswordVisibility,
  };
}
