export async function getSingleOccasion(id: string) {
  const response = await fetch(`${process.env.API}/occasions/${id}`);

  const payload = await response.json();
  if (!payload.status) {
    throw new Error("Failed to fetch occasion");
  }
  return payload;
}
