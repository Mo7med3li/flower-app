import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { updateAddress } from "@/lib/actions/address/update-address.action";
import { AddDressFormType } from "@/lib/schemas/address-model/address-form.schema";

export default function useUpdateAddress() {
  // Translations
  const t = useTranslations();
  //Queries
  const queryClient = useQueryClient();
  //Mutations
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ values, id }: { values: AddDressFormType; id: string }) => {
      return await updateAddress({ values, id });
    },
    onSuccess: () => {
      toast.success(t("address-updated-successfully"));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    },
  });
  return {
    updateAddressPending: isPending,
    updateAddressFn: mutate,
  };
}
