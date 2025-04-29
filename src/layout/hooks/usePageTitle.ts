"use client";

import { usePathname } from "next/navigation";

export function usePageTitle() {
  const pathname = usePathname();

  const getTitleFromPath = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 0) return "Dashboard";
    return segments[segments.length - 1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return getTitleFromPath(pathname);
}
