import { getTranslations } from "next-intl/server";
import SingleProduct from "@/components/common/single-product";
import { Product } from "@/lib/types/products";

const ProductOccasions = async ({ products }: { products: Product[] }) => {
  const t = await getTranslations();
  return (
    <div className="mt-6">
      {products.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-zinc-300 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          {t("no-products-in-this-occasion")}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-4">
          {products.map((product: Product) => (
            <SingleProduct key={product._id} singleProduct={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductOccasions;
