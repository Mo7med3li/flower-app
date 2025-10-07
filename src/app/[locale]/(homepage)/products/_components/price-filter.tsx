"use client";

import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFormatter, useTranslations } from "next-intl";
import ResetComponent from "@/components/common/reset-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "@/i18n/navigation";

// Types
type PriceForm = {
  priceFrom: string;
  priceTo: string;
};

export default function PriceFilter() {
  // Hooks
  const t = useTranslations();
  const format = useFormatter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Form
  const { register, watch, reset } = useForm<PriceForm>({
    defaultValues: {
      priceFrom: "",
      priceTo: "",
    },
  });
  const priceFrom = watch("priceFrom");
  const priceTo = watch("priceTo");

  // change URL when any change in form
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Add or remove priceFrom
    if (priceFrom) params.set("price[gt]", priceFrom);
    else params.delete("price[gt]");

    // Add or remove priceTo
    if (priceTo) params.set("price[lt]", priceTo);
    else params.delete("price[lt]");

    // Change the url
    const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
    router.replace(newUrl);
  }, [priceFrom, priceTo, pathname, router, searchParams]);

  return (
    <div className="mb-6 border-b-2 border-zinc-100 dark:border-zinc-700 pb-6">
      {/* header occasion filter */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg font-primary">{t("product.price")}</h3>
        <ResetComponent
          paramKey={["price[gt]", "price[lt]"]}
          onResetFormValues={() => reset({ priceFrom: "", priceTo: "" })}
        />
      </div>

      {/* price filter component */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        {/* from input  */}
        <div className="flex flex-col gap-2 col-span-1">
          <Label htmlFor="price-from">{t("from")}</Label>
          <Input
            id="price-from"
            aria-label="Price from"
            inputMode="numeric"
            pattern="[0-9]*"
            min={0}
            step={1}
            onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
            }}
            {...register("priceFrom")}
            type="number"
            placeholder={format.number(0, "number-base")}
          />
        </div>

        {/* to input */}
        <div className="flex flex-col gap-2 col-span-1">
          <Label htmlFor="price-to">{t("to")}</Label>
          <Input
            id="price-to"
            aria-label="Price to"
            inputMode="numeric"
            pattern="[0-9]*"
            min={0}
            step={1}
            onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
            }}
            {...register("priceTo")}
            type="number"
            placeholder={format.number(10000, "number-base")}
          />
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        {priceFrom || priceTo
          ? `${t("showing-products")} ${t("from")} ${priceFrom ? format.number(Number(priceFrom), "number-base") : ""}${
              priceFrom && priceTo ? " " : ""
            }${t("to")} ${priceTo ? format.number(Number(priceTo), "number-base") : ""}`
          : t("choose-a-price-range")}
      </p>
    </div>
  );
}
