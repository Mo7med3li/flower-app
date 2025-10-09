import { getTranslations } from "next-intl/server";
import SingleProduct from "@/components/common/single-product";
import { getProducts } from "@/lib/apis/products.api";
import { SearchParamProduct } from "@/lib/types/products";
import EmptyState from "@/components/common/empty-state";
import PaginationComponent from "@/components/common/Pagination-components";

export default async function ProductList({ searchParams }: { searchParams?: SearchParamProduct }) {
  const t = await getTranslations();
  // Functions
  const response = await getProducts(searchParams);

  if ("error" in response) {
    return <EmptyState title={t("products-not-available")} subtitle={t("error-filter")} />;
  }

  const { products } = response;

  return (
    <div className="lg:col-span-9 col-span-12 grid grid-cols-9 gap-4">
      {products.length === 0 ? (
        <EmptyState title={t("no-products-found")} subtitle={t("product-filter")} />
      ) : (
        products.map((product) => (
          <div key={product._id} className="col-span-9 md:col-span-4 lg:col-span-3">
            <SingleProduct singleProduct={product} />
          </div>
        ))
      )}
      <div className="col-span-9 mt-5">
        <PaginationComponent metaData={response.metadata} />
      </div>
    </div>
  );
}
