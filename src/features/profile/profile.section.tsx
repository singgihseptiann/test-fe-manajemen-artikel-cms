"use client";

import React from "react";
import AvatarProfile from "./components/avatar.profile";
import DetailProfile from "./components/detail.profile";
import ProfileSkeleton from "./components/profile.skeleton";
import { useUserProfile } from "./hooks/useUserProfile";
import HomeButton from "@/components/home.button";

export default function ProfileSection() {
  const { username, role, avatarName, isLoading } = useUserProfile();

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="space-y-4">
      <h1 className="text-center">User Profile</h1>

      <AvatarProfile name={avatarName} />

      <DetailProfile
        data={[
          { label: "Username", value: username || "-" },
          { label: "Password", value: "*******" },
          { label: "Role", value: role || "-" },
        ]}
      />

      <HomeButton />
    </div>
  );
}
