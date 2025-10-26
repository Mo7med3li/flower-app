import { getTranslations } from "next-intl/server";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfileSidebar } from "./profile/_components/profile-sidebar";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const t = await getTranslations();
  return (
    <section className="flex flex-col">
      <section className="flex-1 grid grid-cols-4 w-screen md:px-20 gap-9 p-5">
        <header className="col-span-4">
          <h1 className="text-5xl text-zinc-800 font-bold">{t("update-profile")}</h1>
        </header>
        {/* Sidebar */}
        <SidebarProvider className="col-span-1">
          <section className="relative w-full">
            <ProfileSidebar />
          </section>
        </SidebarProvider>

        <section className="col-span-3 bg-white dark:bg-zinc-800">
          {/* Profile Pages */}
          {children}
        </section>
      </section>
    </section>
  );
};

export default ProfileLayout;
