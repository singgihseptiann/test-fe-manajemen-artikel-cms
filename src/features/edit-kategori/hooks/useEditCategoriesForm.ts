"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";
import { useEditCategories } from "./useEditCategories";

const FormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Category field cannot be empty",
    })
    .min(2, {
      message: "Category must be at least 2 characters.",
    }),
});

export const useEditCategoriesForm = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const handleCloseDialog = () => setOpen(false);
  const handleOpenDialog = () => setOpen(true);
  const categoriesEditMutation = useEditCategories();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await categoriesEditMutation.mutateAsync({ id, data });
    } catch (error) {
      console.error("Error submitting article:", error);
    }
  }

  return {
    form,
    onSubmit,
    open,
    setOpen,
    handleCloseDialog,
    handleOpenDialog,
    isSubmitting: categoriesEditMutation.isPending,
  };
};
