"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "./categories.column";
import { usePagination } from "@/context/pagination.context";
import { Spinner } from "@/components/spinner";

import { Button } from "@/components/ui/button";
import { useGetCategories } from "../hooks/useGetCategories";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AddCategoriesForm } from "@/features/add-categories/components/add.categories";

export function CategoriesTable() {
  const { data: categories, isLoading, isFetching } = useGetCategories();
  const { page, setPage } = usePagination();

  const totalCategories = categories?.totalData ?? 0;
  const totalPages = categories?.totalPages ?? 1;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: categories?.data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="rounded-md border bg-white">
        <div className="border-b">
          <div className="flex gap-2 p-2 py-5 font-semibold text-black">
            <p>Total Categories:</p>
            <p>{totalCategories}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-2 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Filter categories..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="h-10"
            />
          </div>

          <AddCategoriesForm />
        </div>
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading || isFetching ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Spinner variant="primary" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 p-2 py-5">
          <div className="text-muted-foreground flex-1 text-sm">
            Page {page} of {totalPages}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
