import React from "react";
import { FormEditArticles } from "./components/edit.articles";

export default function EditArticles({ id }: { id: string }) {
  return (
    <div>
      <FormEditArticles articleId={id} />
    </div>
  );
}
