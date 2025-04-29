import { AvatarProfileProps } from "@/types/profile";
import React from "react";

export default function AvatarProfile({ name }: AvatarProfileProps) {
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div
      className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 font-semibold text-blue-900"
      style={{ fontSize: "1.25rem" }}
    >
      {firstLetter}
    </div>
  );
}
