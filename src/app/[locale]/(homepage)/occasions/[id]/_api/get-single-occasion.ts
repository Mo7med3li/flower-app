export async function getSingleOccasion(id: string) {
  const response = await fetch(`/api/occasion/${id}`);
  const payload = await response.json();
  return payload;
}
