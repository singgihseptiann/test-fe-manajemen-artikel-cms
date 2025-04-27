"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useLogout } from "../hooks/useLogout";
import { useGetUserProfile } from "@/features/profile/hooks/useProfile";

export function UserDropdown() {
  const { data, isLoading, isError } = useGetUserProfile();
  const { openDialog, setOpenDialog, handleLogout } = useLogout();

  if (isLoading) {
    return null;
  }

  // Gunakan data dari API atau data yang disimpan di localStorage jika terjadi error
  const usernameFromAPI = data?.username;
  const usernameFromStorage = localStorage.getItem("user_username");

  const username =
    isError || !usernameFromAPI ? usernameFromStorage : usernameFromAPI;

  const firstLetter = username?.charAt(0).toUpperCase() || "U";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer outline-none hover:bg-transparent focus:bg-transparent"
        >
          <button className="hover:bg-muted flex items-center gap-2 rounded-md px-3 py-1 transition">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 font-semibold text-blue-900">
              {firstLetter}
            </div>
            <span className="hidden font-medium text-blue-900 underline lg:block">
              {username || "User"}
            </span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>{username || "User"}</DropdownMenuLabel>
          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setOpenDialog(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog di luar DropdownMenu agar tidak tertimpa event */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. You will be logged out of your
              account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
