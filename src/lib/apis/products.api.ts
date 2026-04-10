import { BASE_URL } from "../constants/api.constant";
import { ProductDetails, Products, RelatedProducts, SearchParamProduct } from "../types/products";

// Get all products
export const getProducts = async (params?: SearchParamProduct | undefined) => {
  // Declaring products API (base URL only)
  const url = new URL(`${BASE_URL}/products`);

  // Default parameters
  if (!params?.limit) {
    url.searchParams.append("limit", "4");
  }

  // If params are given, append them all
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });
  }

  // Extracting only the API link
  const response = await fetch(url.toString());

  // Returning the products results
  const payload: APIResponse<PaginatedResponse<Products>> = await response.json();
  return payload;
};

// Get product details
export const getProductDetails = async (productId: string) => {
  // Declaring product details API
  const url = new URL(`${BASE_URL}/products/${productId}`);

  // Extracting only the API link with cache tags for revalidation
  const response = await fetch(url.toString(), {
    next: {
      tags: [`product-${productId}`],
    },
  });

  // Returning the product details results
  const payload: APIResponse<ProductDetails> = await response.json();
  return payload;
};

// Get related products
export const getRelatedProduct = async (productId: string) => {
  // Declaring related products API
  const url = new URL(`${BASE_URL}/related/similar/${productId}`);

  // Extracting only the API link
  const response = await fetch(url.toString());

  // Returning the related products results
  const payload: APIResponse<RelatedProducts> = await response.json();

  if ("error" in payload) {
    return { error: payload.error };
  }

  return payload;
};
