import {
  Banknote,
  Check,
  CheckCheck,
  CreditCard,
  TriangleAlert,
  Truck,
  MapPin,
  Tag,
  FileText,
} from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/lib/types/orders";
import OrderItemsContainer from "./order-items-container";

interface orderCardProps {
  order: Order;
}

export default function OrderCard({ order }: orderCardProps) {
  // Translation
  const format = useFormatter();
  const t = useTranslations();

  return (
    <div className="rounded-xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="bg-maroon-600 flex justify-between p-4">
        {/* Order number */}
        <h3 className="text-white font-semibold text-2xl lowercase">
          {t("order-number")} {order.id.split("-")[0]}
        </h3>

        {/* Date */}
        <p className="text-zinc-100">
          {t.rich("created-in", {
            value: format.dateTime(new Date(order.createdAt), "full-date-time-no-day"),
            date: (chunks) => <span className="font-semibold">{chunks}</span>,
          })}
        </p>
      </div>

      {/* Total price & Status*/}
      <div className="flex justify-between m-4 border-b items-center border-zinc-200 pb-4">
        {/* Total price */}
        <div className="text-2xl font-medium">
          {t.rich("total-price", {
            value: format.number(parseFloat(order.total), "currency-int"),
            price: (chunks) => <span className="text-3xl font-bold me-4">{chunks}</span>,
          })}
          {/* Discount Badge */}
          {order.discount && parseFloat(order.discount) > 0 && (
            <Badge className="bg-green-500 text-white hover:bg-green-500 dark:bg-green-400 hover:dark:bg-green-400 ms-2">
              <Tag size={16} className="me-1" />-
              {format.number(parseFloat(order.discount), "currency-int")}
            </Badge>
          )}
          {
            // Paid badge
            order.paymentStatus === "SUCCEEDED" && (
              <Badge className="bg-emerald-500 text-white hover:bg-emerald-500 dark:bg-emerald-400 hover:dark:bg-emerald-400 dark:text-zinc-800 dark:border-none">
                <Check size={20} className="me-2" />
                {t("paid")}
              </Badge>
            )
          }
        </div>

        {/* Status */}
        <div className="font-semibold">
          {t("status")}
          {
            // In Progress state
            (order.status === "PENDING" || order.status === "PROCESSING") && (
              <Badge className="ms-2 bg-blue-500 hover:bg-blue-500 dark:bg-blue-400 hover:dark:bg-blue-400 text-white">
                {t("in-progress-state")}
              </Badge>
            )
          }
          {
            // Canceled state
            order.status === "CANCELLED" && (
              <Badge className="ms-2 bg-red-600 hover:bg-red-600 dark:bg-red-500 hover:dark:bg-red-500 text-white">
                {t("canceled-state")}
              </Badge>
            )
          }
          {
            // Done state
            order.status === "DELIVERED" && (
              <Badge className="ms-2 bg-emerald-500 hover:bg-emerald-500 dark:bg-emerald-400 hover:dark:bg-emerald-400 text-white">
                {t("done-satate")}
              </Badge>
            )
          }
        </div>
      </div>

      {/* Delivery Status , Payment method & Order items*/}
      <div className="mx-4 mb-4">
        {/* Address Information */}
        <div className="mb-4 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-zinc-500" />
            <h4 className="font-semibold text-zinc-700 dark:text-zinc-300">
              {t("delivery-address")}
            </h4>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{order.address?.title}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {order.address?.street}, {order.address?.city}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("phone")}: {order.address?.phone}
          </p>
        </div>

        {/* Coupon Information */}
        {order.coupon && (
          <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
            <div className="flex items-center gap-2 mb-1">
              <Tag className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h4 className="font-semibold text-zinc-700 dark:text-zinc-300">
                {t("coupon-applied")}
              </h4>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {order.coupon.code || t("coupon-discount-applied")}
            </p>
          </div>
        )}

        {/* Order Notes */}
        {order.notes && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="font-semibold text-zinc-700 dark:text-zinc-300">{t("order-notes")}</h4>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{order.notes}</p>
          </div>
        )}

        {/* Payment method */}
        <p className="flex items-center mb-3">
          {t("payment-method")}
          {
            // cash method
            order.paymentMethod === "CASH_ON_DELIVERY" ? (
              <>
                <Banknote className="ms-2 me-1 text-zinc-500" size={20} />
                <span className=" text-zinc-500 font-medium">{t("cash")}</span>
              </>
            ) : (
              // Credit method
              <>
                <CreditCard className="ms-2 me-1 text-zinc-500" size={20} />
                <span className=" text-zinc-500 font-medium">{t("credit-card")}</span>
              </>
            )
          }
        </p>

        {/* Delivery Status */}
        <p className="flex items-center mb-3">
          {t("delivery-status")}
          {
            // Pending state
            (order.status === "PENDING" || order.status === "CONFIRMED") && (
              <>
                <Truck className="ms-2 me-1 text-yellow-600" size={20} />
                <span className=" text-yellow-600 font-medium">{t("pending-delivery-status")}</span>
              </>
            )
          }
          {
            // Canceled state
            order.status === "CANCELLED" && (
              <>
                <TriangleAlert className="ms-2 me-1 text-maroon-500" size={20} />
                <span className=" text-maroon-500 font-medium">
                  {t("canceled-delivery-status")}
                </span>
              </>
            )
          }
          {
            //  Delivered state
            order.status === "DELIVERED" && (
              <>
                <CheckCheck className="ms-2 me-1 text-emerald-600" size={20} />
                <span className=" text-emerald-600 font-medium">
                  {t("delivered-delivery-status")}
                </span>
              </>
            )
          }
        </p>
        {/* Order items */}
        <div className="mb-3">
          <p className="mb-2 font-semibold">{t("order-items")}</p>
          <OrderItemsContainer orderItems={order.orderItems} />
        </div>

        {/* Order Summary */}
        <div className="border-t pt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-600 dark:text-zinc-400">{t("subtotal")}</span>
            <span className="font-medium">
              {format.number(parseFloat(order.subtotal), "currency-int")}
            </span>
          </div>
          {order.discount && parseFloat(order.discount) > 0 && (
            <div className="flex justify-between">
              <span className="text-green-600 dark:text-green-400">{t("discount")}</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                -{format.number(parseFloat(order.discount), "currency-int")}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-zinc-600 dark:text-zinc-400">{t("shipping")}</span>
            <span className="font-medium">
              {format.number(parseFloat(order.shipping), "currency-int")}
            </span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t">
            <span>{t("total")}</span>
            <span>{format.number(parseFloat(order.total), "currency-int")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
