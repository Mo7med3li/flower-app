export async function getSingleCategory(id: string) {
  const res = await fetch(`${process.env.API}/categories/${id}`);

  const payload = await res.json();
  if (!payload.status) {
    throw new Error(payload.message || "Error fetching single category");
  }
  return payload;
}
