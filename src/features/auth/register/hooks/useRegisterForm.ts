import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegister } from "./useRegister";
import { useState } from "react";

const FormSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username field cannot be empty" })
    .min(3, {
      message: "Username must be at least 3 characters.",
    }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.enum(["User", "Admin"]),
});

export function useRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      role: undefined,
    },
  });

  const registerMutation = useRegister();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    registerMutation.mutate(data);
  }

  return {
    form,
    onSubmit,
    isSubmitting: registerMutation.isPending,
    showPassword,
    togglePasswordVisibility,
  };
}
