import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import applyCoupon from "../_actions/apply.action";

const useApplyCoupon = ({ couponValue }: { couponValue: string }) => {
  // query
  const queryClient = useQueryClient();

  // mutation
  const { mutate: applyCouponMutation, isPending } = useMutation({
    mutationFn: async () => await applyCoupon(couponValue),
    mutationKey: ["apply-coupon"],
    onSuccess: () => {
      toast.success("Coupon applied successfully");
      queryClient.invalidateQueries({
        queryKey: ["user-cart"],
      });
    },
    onError: (e) => {
      toast.error(e.message || "Failed to apply coupon");
    },
  });
  return { applyCouponMutation, isPending };
};
export default useApplyCoupon;
