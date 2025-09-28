import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "@/app/api/testimonials/testimonial.api";

export function useTestimonials() {
  const { isLoading, data, error } = useQuery<TestimonialResponse>({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });
  return { isLoading, testimonials: data, error };
}
