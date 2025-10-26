"use client";

import { Lock, LogOut, UserRoundPen } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ProfileSidebar() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Menu items.
  const items = [
    {
      title: t("my-account"),
      url: "/profile",
      icon: UserRoundPen,
    },
    {
      title: t("change-password"),
      url: "/change-password",
      icon: Lock,
    },
  ];
  // PathName
  const pathName = usePathname();

  return (
    <Sidebar
      side={locale === "ar" ? "right" : "left"}
      className="w-full rounded-lg absolute h-full border-none "
    >
      <SidebarContent className="bg-zinc-50 dark:bg-zinc-900 flex flex-col p-4 shadow-sm rounded-lg">
        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {/* Navigation */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className={cn(
                        "flex gap-[10px] font-medium px-3 rounded-sm py-5",
                        pathName === item.url && "bg-zinc-800 text-zinc-50",
                      )}
                      href={item.url}
                    >
                      <div>{item.icon && <item.icon size={20} />}</div>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Logout Button */}
        <SidebarFooter className="p-0">
          <Button
            className="w-full flex items-center gap-2 rtl:flex-row-reverse dark:bg-zinc-800"
            onClick={() => signOut()}
            variant={"ghost"}
          >
            <LogOut />
            {t("logout")}
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
