export async function getSingleCategory(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/categories/${id}`);
  const payload = await response.json();
  return payload;
}
