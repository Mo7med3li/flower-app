import { getTranslations } from "next-intl/server";
import { getOrders } from "@/lib/apis/orders.api";
import { Order } from "@/lib/types/orders";
import OrderCard from "./_components/order-card";
import EmptyOrders from "./_components/empty-orders";
import ErrorOrders from "./_components/error-orders";

export default async function Page() {
  // Translations
  const t = await getTranslations();

  // Functions
  const response = await getOrders();

  if (!response.status) {
    return <ErrorOrders message={response.message} />;
  }

  // If there are no orders
  if (response.payload?.data.length === 0) {
    return (
      <div>
        <EmptyOrders />
      </div>
    );
  }

  return (
    <section className="px-4 md:px-20">
      {/* Heading */}
      <h2 className="text-5xl mt-16 font-bold text-zinc-800 mb-6 dark:text-zinc-100">
        {t("orders-page-title")}
      </h2>

      {/* Order card */}
      <div className="flex flex-col gap-4 mb-16">
        {response.payload?.data.map((order: Order) => (
          <OrderCard order={order} key={order.id} />
        ))}
      </div>
    </section>
  );
}
