import React from "react";

export function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent" />
    </div>
  );
}
