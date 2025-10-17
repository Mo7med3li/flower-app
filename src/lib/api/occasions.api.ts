import { occasions, SearchParamOcassion } from "../types/occasions";

export const getOccasions = async (params?: SearchParamOcassion | undefined) => {
  // Declaring occasion API
  const url = new URL(`${process.env.API}/occasions`);

  // If no params are given
  if (!params) {
    const response = await fetch(url.toString());

    const payload: APIResponse<PaginatedResponse<occasions>> = await response.json();

    return payload;
  }

  // If params are given (this handle any given params included in the param type)
  Object.entries(params).forEach((param) => {
    url.searchParams.append(param[0].toString(), param[1].toString());
  });

  // Extracting only the API Link
  const response = await fetch(url.toString());

  // Returning the occasion results
  const payload: APIResponse<PaginatedResponse<occasions>> = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
};
