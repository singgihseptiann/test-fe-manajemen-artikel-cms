"use client";
import { usePathname } from "next/navigation";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If the path is home or register, render only the children without sidebar or header
  if (pathname === "/" || pathname === "/register") {
    return <>{children}</>;
  }

  return (
    <div className="">
      <Sidebar />

      <div className="ml-0 flex flex-1 flex-col md:ml-64">
        <Header />
        <main className="flex-1 overflow-hidden p-4">{children}</main>
      </div>
    </div>
  );
}
