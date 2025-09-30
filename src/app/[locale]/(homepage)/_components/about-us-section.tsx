import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import AboutImage from "./about-image";

export default function AboutUs() {
  // Translation
  const t = useTranslations();
  return (
    <section className="my-36 px-4 lg:px-20 grid grid-cols-1 lg:grid-cols-2  items-center justify-center">
      <AboutImage />
      <div className="col-span-1">
        <h3 className="font-bold leading-8 tracking-title align-middle uppercase text-soft-pink-500 dark:text-maroon-400">
          {t("about")}
        </h3>
        <p className="mt-6 text-maroon-700 dark:text-soft-pink-200 font-bold text-3xl">
          {t.rich("about-section.title", {
            pink: (chunk) => (
              <span className="text-soft-pink-500 dark:text-maroon-400">{chunk}</span>
            ),
          })}
        </p>
        <p className="font-Sarabun font-normal text-zinc-500 dark:text-zinc-400 mt-2">
          {t("about-description")}
        </p>
        <Button className="bg-maroon-600 h-10 w-32 mt-6 hover:bg-maroon-600 py-3 px-5 rounded-lg font-Sarabun">
          {t("discover")}
          <span>
            <ArrowRight className="ml-1.5 rtl:rotate-180" size={16} />
          </span>
        </Button>
        <div className="mt-10 flex items-start gap-6">
          <div className="flex flex-col gap-5 items-start pl-2.5">
            <div className=" font-Sarabun text-zinc-800 flex items-center gap-5 dark:text-zinc-50">
              <Check className="text-maroon-600 dark:text-soft-pink-200" />
              {t("competitive-prices-and-easy-shopping")}
            </div>
            <div className=" font-Sarabun text-zinc-800 flex items-center gap-5 dark:text-zinc-50">
              <Check className="text-maroon-600 dark:text-soft-pink-200" />
              {t("perfect-for-every-occasion")}
            </div>
          </div>
          <div className="flex flex-col gap-5 items-start pl-2.5 ">
            <div className=" font-Sarabun text-zinc-800 flex items-center gap-5 dark:text-zinc-50">
              <Check className="text-maroon-600 dark:text-soft-pink-200" />
              {t("premium-quality-and-elegant-packaging")}
            </div>
            <div className=" font-Sarabun text-zinc-800 flex items-center gap-5 dark:text-zinc-50">
              <Check className="text-maroon-600 dark:text-soft-pink-200" />
              {t("fast-and-reliable-delivery")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
