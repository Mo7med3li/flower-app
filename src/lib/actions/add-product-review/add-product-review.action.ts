"use server";

import { revalidateTag } from "next/cache";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { ProductReviewField } from "@/lib/schemas/add-product-review.schema";
import { AddProductReviewResponse } from "@/lib/types/add-product-review";
import { getTokenHeader } from "@/lib/utils/tokenHeader";

type AddProductReviewProps = {
  values: ProductReviewField & { productId?: string };
  productId: string;
};
export async function addProductReview({ values, productId }: AddProductReviewProps) {
  // Token
  const token = await getTokenHeader();

  values.productId = productId;
  const response = await fetch(`${process.env.API}/reviews`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify({
      ...values,
    }),
  });

  const payload: APIResponse<AddProductReviewResponse> = await response.json();
  if (!payload.status) {
    throw new Error(payload.message);
  }
  revalidateTag(`product-${productId}`);
  return payload;
}
