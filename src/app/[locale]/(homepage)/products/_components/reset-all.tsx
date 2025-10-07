"use client";

import React from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function ResetAll() {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Functions
  const handleResetAll = () => {
    router.push(pathname);
  };

  return (
    <div className="py-4">
      <Button
        onClick={handleResetAll}
        className="bg-maroon-50 hover:bg-maroon-100 text-maroon-600 w-full dark:bg-zinc-700 dark:text-softpink-300 dark:hover:bg-zinc-600"
      >
        <RotateCcw size={18} className="text-maroon-600 dark:text-soft-pink-300" />
        Reset all
      </Button>
    </div>
  );
}
