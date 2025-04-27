"use client";

import { LoginForm } from "./components/login";
import Link from "next/link";
import logoIpsum from "@/assets/logo/logo2.png";
import Image from "next/image";

export default function AdminLogin() {
  return (
    <div>
      <div className="w-full rounded-lg bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <Image src={logoIpsum} alt="Logo" className="mx-auto h-auto w-32" />
        </div>

        {/* Login Form */}
        <LoginForm />

        <div className="mt-6 text-center">
          <span>Don't have an account? </span>
          <Link href="/register" className="text-blue-500 underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
