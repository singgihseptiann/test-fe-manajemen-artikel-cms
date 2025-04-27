import { ArticlesTable } from "@/features/articles/components/articles.tables";
import { ProtectedRoute } from "@/features/protected-route/protected.route";
import React from "react";

export default function ArticlesPage() {
  return (
    <ProtectedRoute>
      <div className="flex w-full flex-col justify-center">
        <h1>Articles</h1>
        <ArticlesTable />
      </div>
    </ProtectedRoute>
  );
}
