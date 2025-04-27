import AdminLogin from "@/features/auth/login/admin.login";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center">
      <AdminLogin />
    </main>
  );
}
