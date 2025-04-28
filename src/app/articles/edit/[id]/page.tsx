import React from "react";
import EditArticles from "@/features/edit-articles/edit.articles";

export default async function EditArticlesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <EditArticles id={id} />
    </div>
  );
}
