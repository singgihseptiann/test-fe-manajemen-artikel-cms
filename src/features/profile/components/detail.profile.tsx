"use client";

import { DetailProfileProps } from "@/types/profile";

export default function DetailProfile({ data }: DetailProfileProps) {
  return (
    <div className="w-72 max-w-md md:w-96">
      <div className="space-y-2 overflow-hidden rounded-lg border border-gray-200">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 ${
              index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
            }`}
          >
            <p className="font-medium text-gray-700">{item.label} :</p>
            <p className="text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
