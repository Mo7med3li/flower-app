import { MoveLeft, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const EmptyCart = () => {
  // translations
  const t = useTranslations();

  // router
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-zinc-600">
      <div className="flex items-center justify-center rounded-full bg-zinc-100 p-4">
        <ShoppingCart className="size-10 text-zinc-500" />
      </div>
      <p className="text-2xl font-semibold text-zinc-800">{t("your-cart-is-empty")}</p>
      <p className="max-w-md text-sm text-zinc-500">{t("empty-card-p")}</p>
      <Button className="mt-2 flex items-center rtl:flex-row-reverse" onClick={() => router.back()}>
        <MoveLeft />
        {t("continue-shopping")}
      </Button>
    </div>
  );
};
export default EmptyCart;
