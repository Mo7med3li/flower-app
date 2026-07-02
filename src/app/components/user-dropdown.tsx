"use client";

// React & Next.js
import React from "react";
import { useRouter } from "next/navigation";

// Icons
import { ChevronDown, User, LogOut, ScrollText, MapPinHouse, Settings } from "lucide-react";

// Libraries
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// UI Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ApplicationUser } from "@/lib/types/api";

// Types
type UserProps = {
  user: ApplicationUser;
};

export default function UserDropdown({ user }: UserProps) {
  // Hooks
  const router = useRouter();

  // Navigate to profile page using
  const handleProfile = () => {
    router.push("/profile");
  };

  // Handle user logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // Translation
  const t = useTranslations();
  return (
    <div className="flex-1 border-r pr-4 font-primary">
      {/* Greeting text */}
      <p className="text-zinc-500 text-sm font-normal whitespace-nowrap">{t("hello")}</p>
      {/* User dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-nowrap items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md p-1 transition-colors">
          <p className="text-maroon-700 dark:text-soft-pink-200 font-medium text-base">
            {user?.firstName}
          </p>
          <ChevronDown className="w-5 h-5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-48 dark:bg-zinc-600">
          <h2 className="text-base font-semibold text-maroon-700 dark:text-soft-pink-200 font-primary px-2 py-[6px] border-b dark:border-zinc-500">
            {user?.firstName} {user?.lastName}
          </h2>
          {/* Profile menu item */}
          <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span> {t("my-profile")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/all-addresses" className="flex items-center gap-2">
              <MapPinHouse className="mr-2 h-4 w-4" />
              <span> {t("my-addresses")}</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/allOrders" className="flex items-center gap-2">
              <ScrollText className="mr-2 h-4 w-4" />
              <span> {t("my-orders")}</span>
            </Link>
          </DropdownMenuItem>

          {user.role === "ADMIN" && (
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                <Settings className="mr-2 h-4 w-4" />
                <span> {t("dashboard")}</span>
              </Link>
            </DropdownMenuItem>
          )}

          {/* Logout menu item */}
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer border-t dark:border-zinc-500"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
