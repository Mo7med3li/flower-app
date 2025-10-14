import { AllCategory } from "@/lib/types/category";

export async function getAllCategory() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/categories`);

  const payload: APIResponse<SuccessfulResponse<PaginatedResponse<AllCategory>>> =
    await response.json();
  if ("error" in payload) {
    throw new Error("Error Fetching the categories");
  }

  return payload;
}
