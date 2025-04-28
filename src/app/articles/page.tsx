import ArticlesListTable from "@/features/articles/articles.list.table";

import { ProtectedRoute } from "@/features/protected-route/protected.route";
import React from "react";

export default function ArticlesPage() {
  return (
    <ProtectedRoute>
      <ArticlesListTable />
    </ProtectedRoute>
  );
}
