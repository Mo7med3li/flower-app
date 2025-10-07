import React from "react";

export default function FilterCategorySkeleton() {
  return (
    <ul className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="flex items-center gap-2 rounded-md border bg-gray-100 p-2">
          <div className="size-8 rounded-md bg-gray-300" />
          <div className="h-7 w-24 rounded bg-gray-300" />
        </li>
      ))}
    </ul>
  );
}
