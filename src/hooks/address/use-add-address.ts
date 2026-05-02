import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { addAddress } from "@/lib/actions/address/add-address.action";
import { AddDressFormType } from "@/lib/schemas/address-model/address-form.schema";

export default function useAddAddress() {
  // Translations
  const t = useTranslations();
  //   Queries
  const queryClient = useQueryClient();
  //   Mutations
  const { isPending, mutate } = useMutation({
    mutationFn: async (values: AddDressFormType) => {
      return await addAddress({ values });
    },
    onSuccess: () => {
      toast.success(t("address-added-successfully"));
    },
    onError: (error) => {
      toast.error(error.message || t("something-went-wrong"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    },
    meta: {
      errorMessage: t("something-went-wrong"),
      loadingMessage: t("adding-address"),
    },
  });
  return {
    isPending,
    addAddressFn: mutate,
  };
}
