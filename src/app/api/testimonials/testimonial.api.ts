export async function getTestimonials() {
  const response = await fetch(`${process.env.API}/testimonials`);
  const payload = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
