"use client";

import { HeartCrack, MoveLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "../../ui/button";

const EmptyWishlist = () => {
  // translations
  const t = useTranslations();
  // router
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center text-center text-sm text-zinc-500 gap-1 dark:text-zinc-400">
      <HeartCrack className="size-40" />
      {t("wishlist-empty")}
      <Button
        className="mt-2 flex items-center rtl:flex-row-reverse"
        onClick={() => router.push("/")}
      >
        <MoveLeft className="rtl:rotate-180" />
        {t("continue-searching")}
      </Button>
    </div>
  );
};

export default EmptyWishlist;
