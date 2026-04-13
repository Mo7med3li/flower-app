export async function getSingleCategory(id: string) {
  const response = await fetch(`/api/categories/${id}`);
  const payload = await response.json();
  return payload;
}
