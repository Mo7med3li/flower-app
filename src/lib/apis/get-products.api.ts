import { Product, Products, SearchParamProduct } from "../types/products";
import { APIResponse, PaginatedResponse } from "../types/api";

export const getProducts = async (params: SearchParamProduct | undefined) => {
  // Declaring products API
  const url = new URL(`${process.env.API}/products`);

  // If no params are given (undefined)
  if (!params) {
    const response = await fetch(url.toString());

    const payload: APIResponse<PaginatedResponse<Products>> = await response.json();
    if (!payload.status) {
      throw new Error(payload.error);
    }
    return payload;
  }

  // If params are given (this handle any given params included in the type)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key.toString(), value.toString());
    }
  });

  // Extracting only the API link
  const response = await fetch(url.toString());

  // Returning the products results
  const payload: APIResponse<PaginatedResponse<Products>> = await response.json();

  return payload;
};

export const getProductById = async (productId: string) => {
  // Declaring single product API endpoint
  const url = `${process.env.API}/products/${productId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const payload: APIResponse<{ product: Product }> = await response.json();

    // Type guard to ensure it's a successful response
    if ("error" in payload) {
      throw new Error(payload.error);
    }

    return payload;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching product:", error);
    throw error;
  }
};
