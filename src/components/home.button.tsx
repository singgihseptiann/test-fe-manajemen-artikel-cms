import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function HomeButton() {
  return (
    <div>
      <Link href="/articles">
        <Button className="w-full cursor-pointer bg-blue-600 text-white hover:bg-blue-700">
          Back to home
        </Button>
      </Link>
    </div>
  );
}
