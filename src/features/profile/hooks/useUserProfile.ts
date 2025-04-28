"use client";
import { useGetUserProfile } from "./useProfile";

export function useUserProfile() {
  const { data, isLoading, isError } = useGetUserProfile();

  // Ambil data dari API jika ada, jika tidak ada, fallback ke localStorage
  const usernameFromAPI = data?.username;
  const roleFromAPI = data?.role;

  const username =
    isError || !usernameFromAPI
      ? localStorage.getItem("user_username")
      : usernameFromAPI;
  const role =
    isError || !roleFromAPI ? localStorage.getItem("user_role") : roleFromAPI;
  const avatarName = username || "John Doe";
  return {
    username,
    role,
    avatarName,
    isLoading,
    isError,
  };
}
