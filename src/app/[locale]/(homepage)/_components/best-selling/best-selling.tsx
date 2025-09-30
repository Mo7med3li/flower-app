import { getProducts } from "@/lib/apis/products.api";
import BestSellingSection from "./best-selling-section";

export default async function BestSelling() {
  // Functions
  const response = await getProducts({ limit: 10, sort: "-sold" });

  if ("error" in response) {
    return <p>error</p>;
  }

  const { products } = response;

  return <BestSellingSection products={products} />;
}
