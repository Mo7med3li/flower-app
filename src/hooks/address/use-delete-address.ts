import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { deleteAddress } from "@/lib/actions/address/delete-address";

export default function useDeleteAddress() {
  // Translations
  const t = useTranslations();
  //   Queries
  const queryClient = useQueryClient();
  //   Mutations
  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteAddress(id);
    },
    onSuccess: () => {
      toast.success(t("address-deleted-successfully"));
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    },
    onError: (error) => {
      toast.error(error.message || t("something-went-wrong"));
    },
  });
  return {
    isPending,
    deleteAddressFn: mutate,
  };
}
