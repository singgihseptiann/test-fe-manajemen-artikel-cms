"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDeleteCategories } from "../hooks/useGetCategories";
import ConfirmationDialog from "@/components/confirmation.dialog";
import { CategoriesResponse } from "@/types/categories.types";
import { Checkbox } from "@/components/ui/checkbox";
import { EditCategoriesForm } from "@/features/edit-kategori/components/edit.categories";

export const columns: ColumnDef<CategoriesResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="hidden"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="hidden"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <div>{name ?? "-"}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div>{createdAt ? new Date(createdAt).toLocaleDateString() : "-"}</div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;
      const { mutate: deleteCategories } = useDeleteCategories();

      const handleDelete = () => {
        deleteCategories(category.id); // Delete the category by ID
      };

      return (
        <div className="flex space-x-2">
          {/* Edit button */}
          <EditCategoriesForm id={category.id} />

          {/* Delete confirmation dialog */}
          <ConfirmationDialog
            triggerText="Delete"
            title="Delete Category"
            description="Deleting this category is permanent and cannot be undone."
            onConfirm={handleDelete}
          />
        </div>
      );
    },
  },
];
