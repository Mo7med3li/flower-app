export async function getSingleOccasion(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/occasion/${id}`);
  const payload = await response.json();
  return payload;
}
