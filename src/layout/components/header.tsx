"use client";

import { useSidebar } from "@/context/sidebar.context";
import { Bell, Menu, Search } from "lucide-react";
import Link from "next/link";
import { UserDropdown } from "./dropdown.menu";

export function Header() {
  const { toggle } = useSidebar();

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
        <h1 className="text-xl font-semibold">Admin Panel</h1>
      </div>

      <div className="relative hidden md:block">
        <input
          type="search"
          placeholder="Search..."
          className="rounded-full border border-gray-300 bg-gray-50 py-1.5 pr-4 pl-9 text-sm focus:border-gray-400 focus:outline-none"
        />
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-1.5 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          <span className="sr-only">Notifications</span>
        </button>

        <UserDropdown />
      </div>
    </header>
  );
}
