"use client";

import { useSidebar } from "@/context/sidebar.context";
import { Bell, Menu, Search } from "lucide-react";
import { UserDropdown } from "./dropdown.menu";
import { usePageTitle } from "../hooks/usePageTitle";

export function Header() {
  const { toggle } = useSidebar();
  const pageTitle = usePageTitle();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="rounded p-1 hover:bg-gray-100 md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <UserDropdown />
      </div>
    </header>
  );
}
