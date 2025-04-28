"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServiceAddCategoryForm } from "./useServiceAddCategory";
import { useState } from "react";

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

export const useAddCategoriesForm = () => {
  const [open, setOpen] = useState(false);
  
    const handleCloseDialog = () => setOpen(false); 
    const handleOpenDialog = () => setOpen(true); 
  const categoriesMutation = useServiceAddCategoryForm();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await categoriesMutation.mutateAsync(data);
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
    handleOpenDialog
  };
};
