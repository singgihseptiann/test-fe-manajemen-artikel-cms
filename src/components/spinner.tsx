import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  variant?: "primary" | "secondary" | "danger" | "success" | "white" | "black";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({
  variant = "primary",
  size = "md",
  className,
}: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-4",
    lg: "h-8 w-8 border-4",
  };

  const variantClasses = {
    primary: "border-primary",
    secondary: "border-secondary",
    danger: "border-red-500",
    success: "border-green-500",
    white: "border-white",
    black: "border-black",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "animate-spin rounded-full border-t-transparent",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
      />
    </div>
  );
}
