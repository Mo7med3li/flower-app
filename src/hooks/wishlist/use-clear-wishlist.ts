import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import clearWishlist from "@/lib/actions/wishlist/clear-wishlist.action";

const useClearWishlist = () => {
  // translations
  const t = useTranslations();

  // query
  const queryClient = useQueryClient();

  // mutation
  const { mutate: clearWishlistMutation, isPending } = useMutation({
    mutationFn: async () => await clearWishlist(),
    mutationKey: ["clear-wishlist"],
    onSuccess: () => {
      toast.success(t("wishlist-cleared"));
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
    onError: (e) => {
      toast.error(e.message || t("failed-to-clear-wishlist"));
    },
  });
  return { clearWishlistMutation, isPending };
};
export default useClearWishlist;
