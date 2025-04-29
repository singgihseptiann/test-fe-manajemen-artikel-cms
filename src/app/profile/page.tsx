import ProfileSection from "@/features/profile/profile.section";
import { ProtectedRoute } from "@/features/protected-route/protected.route";

import React from "react";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full justify-center">
        <ProfileSection />
      </div>
    </ProtectedRoute>
  );
}
