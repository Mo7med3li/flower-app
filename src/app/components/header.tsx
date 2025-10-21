// React & Next.js
import React from "react";
import Image from "next/image";

// Icons
import { ClipboardList, Gift, Headset, Heart, House, Info, PartyPopper } from "lucide-react";

import { getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import logo from "@assets/logo.png";

// Libraries
import { authOptions } from "@/auth";

// Navigation
import { Link } from "@/i18n/navigation";

// UI Components
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import ToggleLocale from "@/components/layout/header/components/toggle-locale";
import Notification from "@/components/common/notifications/notification-section";
import CartIcon from "@/components/common/cart-icon";

// Assets
import LocationHeader from "./location-header";

// Locale Components
import UserDropdown from "./user-dropdown";
import MobileNav from "./mobile-nav";

export default async function Header() {
  // Translation
  const t = await getTranslations();

  // Navbar object
  const navbar = [
    {
      name: t("home"),
      href: "/",
      icons: <House className="w-4 h-4" />,
    },
    {
      name: t("products"),
      href: "/products",
      icons: <Gift className="w-5 h-5" />,
    },
    {
      name: t("categories"),
      href: "/categories",
      icons: <ClipboardList className="w-5 h-5" />,
    },
    {
      name: t("occasions"),
      href: "/occasions",
      icons: <PartyPopper className="w-5 h-5" />,
    },
    {
      name: t("contact"),
      href: "/contact",
      icons: <Headset className="w-5 h-5" />,
    },
    {
      name: t("about"),
      href: "/en/about",
      icons: <Info className="w-5 h-5" />,
    },
  ];

  // Session
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <header className=" flex flex-col w-full">
      {/* Mobile top bar */}
      <div className="bg-white dark:bg-zinc-800 w-full md:hidden">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          {/* Left: Hamburger */}
          <MobileNav />
          {/* Center: Logo */}
          <Image src={logo} alt="Logo" className="w-12 h-12" />
          {/* Right: Actions (compact) */}
          <div className="flex items-center gap-3">
            {/* Sign in hidden on mobile to reduce clutter */}
            {/* Favorites */}
            <div className="relative">
              <Heart />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>
            {/* Cart */}
            <CartIcon />
            {/* Notifications */}
            <Notification />
          </div>
        </div>
      </div>

      {/* Desktop/Tablet header */}
      <div className="bg-white dark:bg-zinc-800 w-full hidden md:block">
        <div className="text-lg py-5 container mx-auto flex items-center justify-between gap-4">
          {/* image logo */}
          <Image src={logo} alt="Logo" className="md:w-[85px] md:h-[85px]" />

          {/* address */}
          <div className="hidden lg:block">{session && <LocationHeader />}</div>

          {/* input search */}
          <Input type="search" className="md:max-w-full max-w-xl" placeholder={t("search-bar")} />

          {/* action */}
          <div className="flex items-center gap-4 p-4">
            {/* Authentication Section */}
            {user ? (
              // User is authenticated - display user dropdown menu
              <UserDropdown user={user} />
            ) : (
              // User is not authenticated - display sign in link
              <Link
                href="/auth/login"
                className="text-maroon-700 dark:text-soft-pink-200 font-medium text-base hover:underline whitespace-nowrap"
              >
                {t("sign-in")}
              </Link>
            )}

            {/* user data */}
            <div className=" flex items-center gap-2 border-r border-zinc-200 pr-4">
              <div className="relative">
                <Heart />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>
              <CartIcon />
              {/* Notifications */}
              <Notification />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <ModeToggle />
              </div>
            </div>

            {/* language */}
            <div className="text-zinc-700 dark:text-white text-base font-normal">
              <ToggleLocale />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="bg-white dark:bg-zinc-800 w-full md:hidden border-t">
        <div className="container mx-auto px-4 pb-3">
          <Input type="search" className="w-full" placeholder={t("search-bar")} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-maroon-700 dark:bg-soft-pink-200 hidden md:block">
        <div className=" text-white dark:text-zinc-800 flex justify-center gap-4 px-4">
          {navbar.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="p-3 text-base font-medium hover:text-soft-pink-200 dark:hover:text-maroon-800 after:content-[' '] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-soft-pink-200 relative after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 font-primary dark:hover:after:bg-maroon-800"
            >
              <div className="flex gap-2 justify-center items-center">
                {item.icons}
                <span className="text-base font-medium font-primary">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
