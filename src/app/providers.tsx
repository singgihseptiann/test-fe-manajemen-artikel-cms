"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/context/sidebar.context";
import { PaginationProvider } from "@/context/pagination.context";
import { ImageProvider } from "@/context/image.context";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient(); // Pastikan queryClient hanya dibuat di sini
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <PaginationProvider>
          <ImageProvider>{children}</ImageProvider>
        </PaginationProvider>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
