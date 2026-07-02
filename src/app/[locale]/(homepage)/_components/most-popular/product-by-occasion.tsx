import SingleProduct from "@/components/common/single-product";
import { getProducts } from "@/lib/apis/products.api";
import { Product } from "@/lib/types/products";
import MostPopularError from "./most-popular-error";
import EmptyProductsState from "./empty-products-state";

// OccasionId Type
interface OccasionId {
  occasionId?: string;
}

export default async function ProductsByOccasion({ occasionId }: OccasionId) {
  // Functions
  const response = await getProducts({ occasionId: occasionId });
  if (!response.status) {
    return <MostPopularError />;
  }

  const result = response.payload;
  if (!result || !result.data) {
    return <MostPopularError />;
  }

  const products = result.data;

  // If there are no products in occasion
  if (products.length === 0) {
    return <EmptyProductsState occasion={occasionId} />;
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-6">
      {products.map((product: Product) => (
        <div key={product.id} className="col-span-3">
          <SingleProduct singleProduct={product} />
        </div>
      ))}
    </div>
  );
}
