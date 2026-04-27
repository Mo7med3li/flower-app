"use client";

import { Heart, HeartPlus, Loader2, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useAddToWishlist } from "@/app/[locale]/(homepage)/products/[productId]/hooks/use-add-to-wishlist";
import { useRemoveFromWishlist } from "@/app/[locale]/(homepage)/products/[productId]/hooks/use-delete-from-wishlist";
import { useFetchWishlist } from "@/hooks/wishlist/use-fetch-wishlist";
import { Badge } from "../ui/badge";
import { useCheckUserStatus } from "../providers/components/check-user-status.provider";
import { Button } from "../ui/button";

const ProductCardWishlist = ({
  productId,
  isInWishlist,
}: {
  productId: string;
  isInWishlist?: boolean;
}) => {
  // Translations
  const t = useTranslations();
  const { isAuthenticated } = useCheckUserStatus();
  const router = useRouter();

  // Hooks
  const { addToWishlist, isPending } = useAddToWishlist();
  const { isPending: isRemoving, removeFromWishlist } = useRemoveFromWishlist();
  const { payload, isLoading } = useFetchWishlist();
  const products = payload?.wishlistItems ?? [];

  const productInWishlist = products.find((item) => item.productId === productId);

  return (
    <Badge
      className="dark:text-soft-pink-100 group text-maroon-600 flex items-center gap-1 cursor-pointer bg-white py-1 px-2 hover:bg-maroon-50"
      onClick={() => {
        if (!isAuthenticated) {
          toast.warning(t("you-need-to-login-to-add-products-to-your-wishlist"), {
            action: (
              <Button
                size="icon"
                aria-label="login"
                onClick={() => {
                  router.push("/auth/login");
                }}
              >
                <LogIn size={18} />
              </Button>
            ),
            duration: 2000,
          });
          return;
        }

        if (isInWishlist) {
          removeFromWishlist(productInWishlist?.id || "");
        } else {
          addToWishlist(productId);
        }
      }}
    >
      {isPending || isLoading || isRemoving ? (
        <>
          <Loader2 className="animate-spin" />
        </>
      ) : (
        <>
          {isInWishlist ? <Heart size={20} fill="red" /> : <HeartPlus size={20} />}
          <span className="font-medium text-xs hidden transition-all duration-500 group-hover:block">
            {isInWishlist ? t("remove-from-wishlist") : t("add-to-wishlist")}
          </span>
        </>
      )}
    </Badge>
  );
};

export default ProductCardWishlist;
