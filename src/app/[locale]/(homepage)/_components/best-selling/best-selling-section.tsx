import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types/products";
import BestSellingCarousel from "./best-selling-carousel";
const BestSellingSection = ({ products }: { products: Product[] }) => {
  // Translation
  const t = useTranslations();
  return (
    <div className="grid grid-cols-3 lg:grid-cols-12 gap-8 mb-32 mt-28 lg:px-20 px-4">
      {/* Title */}
      <div className="col-span-3 flex flex-col justify-between">
        <div>
          <h2 className="text-base font-bold uppercase tracking-[0.25em] mb-3 text-soft-pink-500 dark:text-maroon-400">
            {t("best-selling")}
          </h2>
          <p className="text-3xl font-bold text-maroon-700 dark:text-soft-pink-200">
            {t.rich("feature.title", {
              pink: (chunk) => (
                <span className="text-soft-pink-500 dark:text-maroon-400">{chunk}</span>
              ),
            })}
          </p>
          <p className="text-base text-zinc-500">
            {t("not-sure-what-to-choose")}
            <br />
            {t("best-selling-text")}
          </p>
        </div>

        {/* Explore Gifts Button */}
        <Button className="mt-8 px-7 py-3 rounded-lg self-start bg-[#A6252A] hover:bg-[#A6252A]">
          {t("explore-gifts")} <ArrowRight className="rtl:rotate-180" />
        </Button>
      </div>

      {/* Carousel */}
      <BestSellingCarousel products={products} />
    </div>
  );
};

export default BestSellingSection;
