"use client";

// import { MoveRight, TicketPercent } from "lucide-react";
// import { useTranslations } from "next-intl";
// import { useFormatter } from "use-intl";
// import React, { useState } from "react";
import useFetchCart from "@/app/[locale]/(homepage)/cart/_hooks/use-fetch-cart";
// import useApplyCoupon from "@/app/[locale]/(homepage)/cart/_hooks/use-apply-coupons";
// import { usePathname, useRouter } from "@/i18n/navigation";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
import SummarySkeleton from "../skeletons/user-cart/summary.skeleton";

export default function Summary() {
  // Translations and formatting
  // const t = useTranslations();
  // const format = useFormatter();

  // // router
  // const router = useRouter();

  // // pathname
  // const pathname = usePathname();

  // // states
  // const [couponValue, setCoPonValue] = useState("");

  // // hooks
  // const { applyCouponMutation, isPending } = useApplyCoupon({ couponValue });
  const { payload, isLoading } = useFetchCart();

  // handle loading
  if (isLoading) {
    return <SummarySkeleton />;
  }
  if (!payload) {
    return <div>not found</div>;
  }

  // variables
  // const total = payload?.payload.cartItems[0].totalPrice;
  // const totalDiscount = payload?.cart?.totalPriceAfterDiscount;
  // const isCouponApplied = payload?.cart?.appliedCoupons;
  return (
    <>
      <span>summary</span>
    </>
    // <div className="col-span-1 flex flex-col gap-6">
    //   <h4 className="font-semibold text-3xl">{t("summary.summary")}</h4>
    //   <div className="flex flex-col gap-3 p-4 rounded-md bg-zinc-50 dark:bg-zinc-800">
    //     {/* Coupon */}
    //     <div className="flex gap-3 items-center">
    //       <Input
    //         placeholder={t("summary.coupon-code")}
    //         onChange={(e) => setCoPonValue(e.target.value)}
    //         disabled={isPending || total === 0}
    //       />
    //       {/* apply coupon button */}
    //       <Button
    //         className="bg-maroon-600 text-white flex flex-nowrap h-full"
    //         onClick={() => applyCouponMutation()}
    //         disabled={isPending || couponValue === "" || total === 0}
    //       >
    //         <TicketPercent className="mr-2" />
    //         {t("summary.apply-coupon")}
    //       </Button>
    //     </div>

    //     {/* Coupons */}
    //     <div className="h-60 flex justify-center items-center rounded-lg border dark:border-zinc-500">
    //       <p className="text-zinc-400 text-base">
    //         {isCouponApplied?.length > 0
    //           ? isCouponApplied[isCouponApplied.length - 1].coupon.code
    //           : t("summary.no-coupons-applied")}
    //       </p>
    //     </div>
    //     {/* subtotal without discount */}
    //     {payload.payload.cartItems.length > 0 && (
    //       <>
    //         <div className="flex flex-col gap-3 ">
    //           <div className="flex justify-between">
    //             <span className="font-medium text-lg text-zinc-800 font-primary dark:text-white">
    //               {t("summary.subtotal")}
    //             </span>
    //             <span className="font-semibold text-xl text-zinc-800 font-primary dark:text-white">
    //               {format.number(Number(total), "currency-float")}
    //             </span>
    //           </div>

    //           {/* discount if applied */}
    //           {isCouponApplied?.length > 0 && (
    //             <div className="relative flex justify-center items-center py-3">
    //               <div className="absolute inset-0 flex items-center">
    //                 <span className="w-full border-t border-zinc-300"></span>
    //               </div>
    //               <span className="bg-zinc-50 absolute space-x-1 flex items-center rtl:flex-row-reverse -top-4 p-2 w-auto font-semibold text-base font-primary text-zinc-800 dark:bg-zinc-800 dark:text-white">
    //                 <span className="text-red-400">
    //                   {format.number(
    //                     Number(isCouponApplied[isCouponApplied.length - 1].discountAmount) / 100,
    //                     "percentage-int",
    //                   )}
    //                 </span>
    //                 <span>{t("summary.discount")}</span>
    //               </span>
    //             </div>
    //           )}
    //         </div>

    //         {/* total if discount applied */}
    //         {isCouponApplied?.length > 0 && (
    //           <div className="flex justify-between">
    //             <span className="font-medium text-lg text-zinc-800 font-primary dark:text-white">
    //               {t("summary.total")}
    //             </span>
    //             <span className="font-semibold text-xl text-zinc-800 font-primary dark:text-white">
    //               {format.number(Number(totalDiscount ?? total), "currency-float")}
    //             </span>
    //           </div>
    //         )}
    //       </>
    //     )}
    //   </div>

    //   {/* checkout button */}
    //   {pathname === "/cart" && payload?.payload.cartItems.length > 0 && (
    //     <Button
    //       className="bg-maroon-600 w-full flex items-center justify-center rounded-[10px] px-4 py-[10px] h-14"
    //       disabled={payload?.payload.cartItems.length === 0}
    //       onClick={() => router.push("/checkout")}
    //     >
    //       {t("checkout.checkout")}
    //       <MoveRight className="rtl:rotate-180" />
    //     </Button>
    //   )}
    // </div>
  );
}
