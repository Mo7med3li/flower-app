"use client";

import { useLocale, useTranslations } from "next-intl";
import { MoveLeft, MoveRight, Tag, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CashImg from "@assets/Cash-on-Delivery.png";
import CreditImg from "@assets/Credit-Card.png";
import { Address } from "@/lib/types/user-addresses";
import { CheckoutSessionTS } from "@/lib/types/checkout-session";
import { useRouter } from "@/i18n/navigation";
import CheckCreditOrder from "../_actions/checkout-session.action";
import CheckCashOrder from "../_actions/cash-order.action";
// Types
interface AddressStep1Props {
  step: number;
  address: Address;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
type SortOrder = "cash" | "credit";

export default function AddressStep2({ step, address, setStep }: AddressStep1Props) {
  // hook
  const [checked, setChecked] = useState<SortOrder>("cash");
  const [data, setData] = useState<APIResponse<CheckoutSessionTS>>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const queryClient = useQueryClient();
  const [showCouponInput, setShowCouponInput] = useState<boolean>(false);

  // router
  const router = useRouter();

  // Formatter and translations
  const t = useTranslations();
  const locale = useLocale();

  useEffect(() => {
    // Fetch checkout session data
    const fetchCheckoutSession = async () => {
      const sessionData = await CheckCreditOrder(address);
      setData(sessionData);
    };

    fetchCheckoutSession();
  }, [checked, address]);

  const checkoutResult = data?.status ? data.payload : null;

  return (
    <>
      {/* Title  Shipping Address */}
      <h3 className="font-primary font-semibold text-3xl flex items-center justify-start gap-4">
        <Button
          variant={"subtle"}
          onClick={() => {
            if (step > 1) setStep(step - 1);
          }}
          disabled={step > 1 ? false : true}
          className={cn(
            "w-auto flex justify-evenly border-none text-sm font-semibold dark:bg-soft-pink-400 dark:text-zinc-800 dark:hover:bg-soft-pink-500",
            step === 1 && "hidden",
          )}
        >
          {locale === "ar" ? (
            <MoveLeft className="w-5 h-5 mr-2 rotate-180" />
          ) : (
            <MoveLeft className="w-5 h-5 mr-2" />
          )}
          {t("checkout.back")}
        </Button>
        {t("checkout.payment-method")}
      </h3>

      {/* content  */}
      <div className="flex flex-col gap-3 overflow-y-auto">
        <div className=" grid grid-cols-2 gap-4 justify-center p-3">
          {/* Cash on Delivery */}
          <button
            onClick={() => {
              setChecked("cash");
              setIsActive(true);
            }}
            className={cn(
              "col-span-1 flex flex-col justify-center items-center gap-3 border rounded-xl p-4 hover:bg-zinc-50 group",
              isActive && checked === "cash" && "bg-maroon-600 dark:bg-soft-pink-200",
            )}
          >
            <Image
              className={cn(
                "dark:bg-slate-500 dark:group-hover:bg-zinc-50 dark:rounded-2xl",
                isActive && checked === "cash" && "bg-maroon-600 dark:bg-soft-pink-200",
              )}
              src={CashImg}
              alt="Cash on Delivery"
            />
            <h3
              className={cn(
                "text-2xl font-semibold font-primary group-hover:text-maroon-600",
                isActive && checked === "cash" && "text-maroon-600",
              )}
            >
              {t("checkout.cash-delivery")}
            </h3>
            <p className="text-zinc-500 text-sm  font-semibold text-center">
              {t("checkout.cash-title")}
            </p>
          </button>

          {/* Credit Card */}
          <button
            onClick={() => {
              setChecked("credit");
              setIsActive(true);
            }}
            className={cn(
              "col-span-1 flex flex-col justify-center items-center gap-3 border rounded-xl p-4 hover:bg-zinc-50 group",
              isActive && checked === "credit" && "bg-maroon-600 dark:bg-soft-pink-200",
            )}
          >
            <Image
              src={CreditImg}
              alt="Cash on Delivery"
              className={cn(
                "dark:bg-slate-500 dark:group-hover:bg-zinc-50 dark:rounded-2xl",
                isActive && checked === "credit" && "bg-maroon-600 dark:bg-soft-pink-200",
              )}
            />
            <h3
              className={cn(
                "text-2xl font-semibold font-primary group-hover:text-maroon-600",
                isActive && checked === "credit" && "text-maroon-600",
              )}
            >
              {t("checkout.credit-card")}
            </h3>
            <p className="text-zinc-500 text-sm  font-semibold text-center">
              {t("checkout.credit-title")}
            </p>
          </button>
        </div>

        {/* Coupon Code Section */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {t("checkout.coupon-code")}
              </h4>
            </div>
            {!showCouponInput && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCouponInput(true)}
                className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
              >
                {t("checkout.add-coupon")}
              </Button>
            )}
          </div>

          {showCouponInput && (
            <div className="flex gap-2">
              <Input
                placeholder={t("checkout.enter-coupon-code")}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowCouponInput(false);
                  setCouponCode("");
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Order Notes Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800/30">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {t("checkout.order-notes")}
            </h4>
          </div>
          <Textarea
            placeholder={t("checkout.add-delivery-instructions")}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[80px] resize-none"
            maxLength={200}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {notes.length}/200 {t("checkout.characters")}
          </p>
        </div>

        {/* Checkout */}
        <div className="border-t flex items-center justify-end pt-4">
          {checkoutResult && checkoutResult.session?.url ? (
            <Button
              disabled={isActive ? false : true}
              className="w-[200px] flex flex-nowrap justify-evenly "
              onClick={() => {
                if (checked === "credit") {
                  window.location.href = checkoutResult.session.url;
                } else if (checked === "cash") {
                  CheckCashOrder(address, couponCode || undefined, notes || undefined)
                    .then(() => {
                      toast.success(t("your-order-has-been-placed-successfully"));
                      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
                      router.push("/allOrders");
                    })
                    .catch((error) => {
                      toast.error(error.message || "Failed to place order");
                    });
                }
              }}
            >
              {t("checkout.checkout")}
              {locale === "ar" ? (
                <MoveRight className="w-5 h-5 ml-2 rotate-180" />
              ) : (
                <MoveRight className="w-5 h-5 ml-2" />
              )}
            </Button>
          ) : (
            <Button
              disabled={checked === "credit"}
              className="w-[200px] flex flex-nowrap"
              onClick={() => {
                if (checked === "cash") {
                  CheckCashOrder(address, couponCode || undefined, notes || undefined)
                    .then(() => {
                      toast.success(t("your-order-has-been-placed-successfully"));
                      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
                      router.push("/allOrders");
                    })
                    .catch((error) => {
                      toast.error(error.message || "Failed to place order");
                    });
                }
              }}
            >
              {checkoutResult === null && checked === "credit"
                ? t("checkout.loading")
                : t("checkout.checkout")}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
