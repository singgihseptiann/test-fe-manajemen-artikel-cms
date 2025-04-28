import React from "react";
import { CategoriesTable } from "./components/categories.table";

export default function CategoriesListTable() {
  return (
    <div className="flex h-screen w-full flex-col rounded-md bg-gray-50 p-2 shadow-md lg:p-12">
      <CategoriesTable />
    </div>
  );
}
