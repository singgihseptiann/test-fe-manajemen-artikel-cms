import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/articles.types";
import ConfirmationDialog from "@/components/confirmation.dialog";

export const columns: ColumnDef<Article>[] = [
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
    accessorKey: "imageUrl",
    header: "Thumbnail",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl") as string;
      return imageUrl ? (
        <img
          src={imageUrl}
          alt="Thumbnail"
          className="h-12 w-12 object-cover"
        />
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <div className="font-medium">{title ?? "-"}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as { name: string };
      return <div>{category?.name ?? "-"}</div>;
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
      const article = row.original;

      const handleDelete = () => {
        // Implement logic to delete the article here
        console.log("Deleting article", article.id);
      };

      return (
        <div className="flex space-x-2">
          <Button variant="link" size="sm" className="text-blue-500 underline">
            View
          </Button>
          <Button variant="link" size="sm" className="text-blue-500 underline">
            Edit
          </Button>
          <ConfirmationDialog
            triggerText="Delete"
            title="Confirm Deletion"
            description="Are you sure you want to delete this article?"
            onConfirm={handleDelete}
          />
        </div>
      );
    },
  },
];
