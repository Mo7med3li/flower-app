import { getProducts } from "@/lib/apis/products.api";
import BestSellingSection from "./best-selling-section";

export default async function BestSelling() {
  // Functions
  const response = await getProducts({ limit: 10 });

  if (!response.status) {
    return <p>Error loading products</p>;
  }

  const result = response.data || response.payload;
  if (result?.data.length === 0) {
    return <p>No products available</p>;
  }

  return <BestSellingSection products={result?.data} />;
}
