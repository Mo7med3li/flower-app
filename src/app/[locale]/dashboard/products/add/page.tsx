import { getOccasions } from "@/lib/apis/get-occasions.api";
import { getAllCategory } from "@/lib/apis/category";
import ProductForm from "../_components/product-form";

export default async function Page() {
  const occasions = await getOccasions();
  const categories = await getAllCategory();

  if (!("payload" in occasions)) {
    return;
  }

  if (!("payload" in categories)) {
    return;
  }

  return (
    <ProductForm occasions={occasions.payload.data} categories={categories.payload.data.data} />
  );
}
