"use client";
import { useEffect, useState } from "react";
import { useGetUserProfile } from "./useProfile";

export function useUserProfile() {
  const { data, isLoading, isError } = useGetUserProfile();

  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (isError || !data?.username || !data?.role) {
      if (typeof window !== "undefined") {
        const storedUsername = localStorage.getItem("user_username");
        const storedRole = localStorage.getItem("user_role");
        setUsername(storedUsername);
        setRole(storedRole);
      }
    } else {
      setUsername(data.username);
      setRole(data.role);
    }
  }, [data, isError]);

  const avatarName = username || "John Doe";

  return {
    username,
    role,
    avatarName,
    isLoading,
    isError,
  };
}
