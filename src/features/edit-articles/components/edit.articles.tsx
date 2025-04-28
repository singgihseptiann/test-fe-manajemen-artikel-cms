"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import { useGetCategories } from "@/hooks/useGetCategory";
import { Category } from "@/types/categories.types";
import { Spinner } from "@/components/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { useEditArticleForm } from "../hooks/useEditForm";
import { useGetArticlesById } from "../hooks/useEditArticles";

const EditRichTextEditor = dynamic(
  () => import("@/features/edit-articles/components/edit.rich.editor"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] w-full items-center justify-center rounded-md bg-gray-100">
        <Spinner />
      </div>
    ),
  },
);

type FormEditArticlesProps = {
  articleId: string;
};

export function FormEditArticles({ articleId }: FormEditArticlesProps) {
  const {
    form,
    preview,
    handleUploadClick,
    handleFileChange,
    onSubmit,
    fileInputRef,
    editorRef,
    isSubmitting,
    isLoadingArticle,
  } = useEditArticleForm({ id: articleId });

  const { data: categories, isLoading: loadingCategories } = useGetCategories();
  const { data: article } = useGetArticlesById(articleId);
  console.log(article);

  // Set initial values termasuk content
  useEffect(() => {
    if (article) {
      form.setValue("title", article.title || "");
      form.setValue("categoryId", article.categoryId || "");
      form.setValue("thumbnail", article.thumbnail || "");

      // Set content ke editor setelah dipastikan editor sudah siap
      const setEditorContent = () => {
        if (editorRef.current && article.content) {
          editorRef.current.setContent(article.content);
        }
      };

      // Coba langsung set, jika belum siap coba lagi setelah timeout
      setEditorContent();
      const timer = setTimeout(setEditorContent, 500);

      return () => clearTimeout(timer);
    }
  }, [article, form, editorRef]);

  if (isLoadingArticle) {
    return <Spinner />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Thumbnail */}
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <div
                className="w-52 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:bg-gray-50"
                onClick={handleUploadClick}
              >
                {preview ? (
                  <div className="relative h-48 w-full">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <svg
                      className="mb-2 h-10 w-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm font-medium">Click to select files</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Support File Type: .jpg or .png
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Input className="w-full" placeholder="Enter title" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {loadingCategories ? (
                    <div className="space-y-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : (
                    categories?.data?.map((category: Category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Content</label>
          <EditRichTextEditor
            ref={editorRef}
            initialContent={article.content || ""}
          />
        </div>

        {/* Buttons */}
        <div className="mt-16 flex justify-end space-x-4">
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Update"}
          </Button>
          <Button
            type="button"
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
