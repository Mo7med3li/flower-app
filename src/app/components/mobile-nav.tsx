"use client";

import React from "react";
import { Menu, X, House, Gift, ClipboardList, PartyPopper, Headset, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function MobileNav() {
  // Translation
  const t = useTranslations();

  // States
  const [open, setOpen] = React.useState(false);

  const navbar = [
    { name: t("home"), href: "/", icon: House },
    { name: t("products"), href: "/products", icon: Gift },
    { name: t("categories"), href: "/categories", icon: ClipboardList },
    { name: t("occasions"), href: "/occasions", icon: PartyPopper },
    { name: t("contact"), href: "/contact", icon: Headset },
    { name: t("about"), href: "/en/about", icon: Info },
  ];

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-md text-maroon-700 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-40" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />

          {/* Panel */}
          <div className="absolute top-0 left-0 right-0 z-50 bg-maroon-700 dark:bg-soft-pink-200 text-white dark:text-zinc-800 shadow-lg">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-semibold">{t("menu")}</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-maroon-800/20 dark:hover:bg-maroon-800/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="px-2 pb-4">
              {navbar.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-maroon-800/20 dark:hover:bg-maroon-800/10"
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-base font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
