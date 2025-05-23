// useArticleForm.ts
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServiceArticlesForm } from "./useServiceArticlesForm";
import { usePostImg } from "./usePostImg";

import type { RichTextEditorHandle } from "@/features/add-articles/components/rich.text.editor";
import { useImageContext } from "@/context/image.context";
const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Please enter a title (at least 3 characters)." }),
  categoryId: z.string().min(1, { message: "Please select a category." }),
  thumbnail: z
    .any()
    .refine((file) => file !== null, { message: "Please enter a picture." }),
});

export function useArticleForm() {
  const { imageUrl } = useImageContext();
  console.log("imageUrl", imageUrl);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<RichTextEditorHandle>(null);
  const articlesMutation = useServiceArticlesForm();
  const { mutate: uploadImage, isPending: isUploading } = usePostImg();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      thumbnail: null,
    },
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("thumbnail", file);
      const formData = new FormData();
      formData.append("image", file);
      uploadImage(formData);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const content = editorRef.current?.getContent() || "";

    if (content.trim() === "") {
      form.setError("root.content", {
        type: "manual",
        message: "Content field cannot be empty.",
      });
      alert("Content field cannot be empty.");
      return;
    }

    if (content.length < 10) {
      form.setError("root.content", {
        type: "manual",
        message: "Content must be at least 10 characters.",
      });
      alert("Content must be at least 10 characters.");
      return;
    }

    const articleData = {
      title: values.title,
      content: content,
      categoryId: values.categoryId,
      imageUrl: imageUrl, // Gunakan imageUrl dari context
    };

    try {
      await articlesMutation.mutateAsync(articleData);
      alert("Artikel berhasil ditambahkan!");
    } catch (error) {
      console.error("Error submitting article:", error);
    }
  };

  return {
    form,
    preview,
    handleUploadClick,
    handleFileChange,
    onSubmit,
    fileInputRef,
    editorRef,
    isSubmitting: articlesMutation.isPending,
    isError: articlesMutation.isError,
    isSuccess: articlesMutation.isSuccess,
    isUploading,
  };
}
