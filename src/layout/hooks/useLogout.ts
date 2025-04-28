"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogout() {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_username");
    localStorage.removeItem("user_password");

    setOpenDialog(false);
    router.push("/");
  };

  return {
    openDialog,
    setOpenDialog,
    handleLogout,
  };
}
