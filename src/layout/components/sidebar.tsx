"use client";

import { useSidebar } from "@/context/sidebar.context";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "../menu";
import { useLogout } from "../hooks/useLogout";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";

export function Sidebar() {
  const { isOpen, close } = useSidebar();
  const pathname = usePathname();
  const { handleLogout } = useLogout();

  // Mengambil data profil pengguna dari hook
  const { username, role, avatarName, isLoading, isError } = useUserProfile();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-blue-600 text-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-blue-700 p-4">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
          <button
            onClick={close}
            className="cursor-pointer rounded p-1 hover:bg-blue-700 md:hidden"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2">
          {links.map((link) => {
            if (link.name === "Logout") {
              return (
                <button
                  key={link.name}
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-blue-700"
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </button>
              );
            } else {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-blue-700 ${
                    isActive ? "bg-blue-700 font-medium" : ""
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              );
            }
          })}
        </nav>

        {/* Footer sidebar with user profile */}
        <div className="border-t border-blue-700 p-4">
          <div className="flex items-center gap-3">
            {/* Avatar or placeholder */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700">
              {/* Placeholder for avatar */}
              <span className="text-xs text-white">
                {avatarName?.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{username}</p>
              <p className="text-xs text-blue-200">{role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
