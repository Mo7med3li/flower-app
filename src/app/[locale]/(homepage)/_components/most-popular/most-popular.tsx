import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { getOccasions } from "@/lib/apis/occasions.api";
import BarTitle from "@/components/common/bar-title";
import SingleProductSkeleton from "@/components/skeletons/single-product/single-product.skeleton";
import ProductsByOccasion from "./product-by-occasion";
import TabsTitle from "./tabs-title";

export default async function MostPopular({
  searchParams,
}: {
  searchParams: { occasion?: string };
}) {
  const t = await getTranslations();
  // Functions
  const response = await getOccasions({ limit: 4 });

  // Error handling
  if ("error" in response) {
    return <p>{t("error-while-fetching-data")}</p>;
  }

  // Variables
  const { occasions } = response;
  let selectedOccasion = occasions.find((occasion) => occasion._id === searchParams.occasion);

  // If search params are empty (default search param)
  if (!searchParams.occasion) {
    selectedOccasion = occasions[0];
  }

  // If occasion Id does not exist (change in occasion id)
  if (!selectedOccasion) {
    return <p>{t("occasion-id-not-valid")}</p>;
  }

  return (
    <>
      <Tabs defaultValue={`${selectedOccasion._id}`} className="lg:px-20 px-4">
        {/* Heading */}
        <div className="flex justify-between items-center">
          {/* Title */}
          <BarTitle title={t("most-popular")} highlightBarWidth="w-[27%]" mainBarWidth="w-9/12" />

          {/* Taps list titles */}
          <TabsList className="bg-transparent gap-6">
            <TabsTitle occasions={occasions} />
          </TabsList>
        </div>

        {/* Products based on occasion */}
        <TabsContent
          defaultValue={selectedOccasion._id}
          key={selectedOccasion._id}
          value={selectedOccasion._id}
          className="mt-10"
        >
          <Suspense fallback={<SingleProductSkeleton count={4} key={selectedOccasion._id} />}>
            <ProductsByOccasion occasionId={selectedOccasion._id} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
}
