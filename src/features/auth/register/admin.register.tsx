import React from "react";
import Link from "next/link";
import logoIpsum from "@/assets/logo/logo2.png";
import Image from "next/image";
import { RegisterForm } from "./components/register";

export default function AdminRegister() {
  return (
    <div>
      <div className="w-full rounded-lg bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <Image src={logoIpsum} alt="Logo" className="mx-auto h-auto w-32" />
        </div>

        {/* Register Form */}
        <RegisterForm />

        {/* Link to Login */}
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
