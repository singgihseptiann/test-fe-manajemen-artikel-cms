"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddCategoriesForm } from "../hooks/useAddCategoriesForm";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/components/spinner";

export function AddCategoriesForm() {
  const {
    form,
    onSubmit,
    handleCloseDialog,
    handleOpenDialog,
    open,
    setOpen,
    isSubmitting,
  } = useAddCategoriesForm();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-500 p-2 px-5 text-white hover:bg-blue-600"
        onClick={handleOpenDialog} // Open dialog on click
      >
        <Plus />
        Add Category
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-start">Add Categories</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Input category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant={"outline"}
                onClick={handleCloseDialog}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="cursor-pointer bg-blue-500 hover:bg-blue-600"
              >
                {isSubmitting ? <Spinner size="sm" variant="white" /> : "Add"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
