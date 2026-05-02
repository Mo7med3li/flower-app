import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ShowImagesDialog } from "@/components/common/show-images-dialog";
import { getOccasions } from "@/lib/apis/get-occasions.api";
import { getAllCategory } from "@/lib/apis/category";
import { getProductById } from "@/lib/apis/get-products.api";
import ProductForm from "../_components/product-form";

interface ProductIdProbs {
  params: {
    productId: string;
  };
}

export default async function Page({ params }: ProductIdProbs) {
  // Translations
  const t = await getTranslations();

  // Variables
  const { productId } = params;
  // Functions
  const [occasions, categories, response] = await Promise.all([
    getOccasions(),
    getAllCategory(),
    getProductById(productId || ""),
  ]);

  // Error handling
  if ("error" in response || !("payload" in occasions) || !("payload" in categories)) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Form */}
      <ProductForm
        edit
        product={response.payload.product}
        occasions={occasions.payload.data}
        categories={categories.payload.data.data}
      />

      {/* Images dialogs */}
      <div className="flex justify-end gap-3">
        <ShowImagesDialog
          cover={response.payload.product.imgCover}
          buttonTitleCoverTranslation={t("product-cover")}
        />
        <ShowImagesDialog
          gallary={response.payload.product.images}
          buttonTitleGallaryTranslation={t("product-gallary")}
        />
      </div>
    </div>
  );
}
