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

import { Plus } from "lucide-react";

import { useEditCategoriesForm } from "../hooks/useEditCategoriesForm";
import { Spinner } from "@/components/spinner";

export function EditCategoriesForm({ id }: { id: string }) {
  const {
    form,
    onSubmit,
    handleCloseDialog,
    handleOpenDialog,
    open,
    setOpen,
    isSubmitting,
  } = useEditCategoriesForm({ id });
  console.log("id", id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="flex items-center justify-center gap-2 rounded-md px-5 text-blue-500"
        onClick={handleOpenDialog} // Open dialog on click
      >
        <Button
          variant={"link"}
          className="cursor-pointer text-blue-500 underline"
        >
          Edit Category
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-start">Edit Category</DialogTitle>
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
                    <Input placeholder="Input category baru" {...field} />
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
                {isSubmitting ? (
                  <Spinner size="sm" variant="white" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
