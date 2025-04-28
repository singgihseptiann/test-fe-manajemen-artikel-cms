import React from "react";
import { ArticlesTable } from "./components/articles.tables";

export default function ArticlesListTable() {
  return (
    <div className="flex h-screen w-full flex-col rounded-md bg-gray-50 p-12 shadow-md">
      <ArticlesTable />
    </div>
  );
}
