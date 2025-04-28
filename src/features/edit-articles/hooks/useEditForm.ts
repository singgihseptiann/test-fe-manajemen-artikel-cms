import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEditArticles, useGetArticlesById } from "./useEditArticles";
import type { RichTextEditorHandle } from "@/features/add-articles/components/rich.text.editor";

const formSchema = z.object({
  title: z.string().min(3, { message: "Please enter a title." }),
  categoryId: z.string().min(1, { message: "Please select a category." }),
  thumbnail: z.any().optional(),
});

export function useEditArticleForm({ id }: { id: string }) {

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<RichTextEditorHandle>(null);

  const articlesMutation = useEditArticles();
  const { data: article, isLoading: isLoadingArticle } = useGetArticlesById(id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (article?.data) {
      // Set form values from fetched article data
      form.reset({
        title: article.data.title,
        categoryId: article.data.categoryId,
        thumbnail: article.data.imageUrl || null,
      });

      // Set content in the editor
      if (editorRef.current) {
        editorRef.current.setContent(article.data.content || "");
      }

      // Set preview image if exists
      if (article.data.imageUrl) {
        setPreview(article.data.imageUrl);
      }
    }
  }, [article, form]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("thumbnail", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const content = editorRef.current?.getContent() || "";

    if (!content.trim()) {
      form.setError("root", {
        type: "manual",
        message: "Content field cannot be empty.",
      });
      return;
    }

    if (content.length < 10) {
      form.setError("root", {
        type: "manual",
        message: "Content must be at least 10 characters.",
      });
      return;
    }

    // Hilangkan thumbnail jika tidak ada perubahan
    const dataToSubmit = { ...values, content };
    if (!values.thumbnail) {
      delete dataToSubmit.thumbnail;
    }

    // Pastikan ID artikel di-passing dengan benar
    if (id) {
      articlesMutation.mutate({ id, data: dataToSubmit });
    } else {
      console.error("ID artikel tidak ditemukan");
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
    isLoadingArticle,
  };
}
