import { ProductDetails, Products, RelatedProducts, SearchParamProduct } from "../types/products";

// Get all products
export const getProducts = async (params?: SearchParamProduct | undefined) => {
  // Declaring products API
  const url = new URL(`${process.env.API}/Products`);

  // If no params are given (undefined)
  if (!params || params === undefined) {
    const response = await fetch(url.toString());

    const payload: APIResponse<PaginatedResponse<Products>> = await response.json();

    return payload;
  }

  // If params are given (this handle any given params included in the type)
  Object.entries(params).forEach((param) => {
    url.searchParams.append(param[0].toString(), param[1].toString());
  });

  // Extracting only the API link
  const response = await fetch(url.toString());

  // Returning the products results
  const payload: APIResponse<PaginatedResponse<Products>> = await response.json();

  return payload;
};

// Get product details
export const getProductDetails = async (productId: string) => {
  // Declaring product details API
  const url = new URL(`${process.env.API}/Products/${productId}`);

  // Extracting only the API link
  const response = await fetch(url.toString());

  // Returning the product details results
  const payload: APIResponse<ProductDetails> = await response.json();

  return payload;
};

// Get related products
export const getRelatedProduct = async (productId: string) => {
  // Declaring related products API
  const url = new URL(`${process.env.API}/related/similar/${productId}`);

  // Extracting only the API link
  const response = await fetch(url.toString());

  // Returning the related products results
  const payload: APIResponse<RelatedProducts> = await response.json();

  return payload;
};
