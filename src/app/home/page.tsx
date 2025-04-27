import { ProtectedRoute } from "@/features/protected-route/protected.route";
import React from "react";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full items-center justify-center">
        <h1>Home</h1>
      </div>
    </ProtectedRoute>
  );
}
