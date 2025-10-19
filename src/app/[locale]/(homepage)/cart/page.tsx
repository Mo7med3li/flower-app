import Summary from "@/components/common/summary";
import CartSection from "./_components/cart.section";

const CartPage = () => {
  return (
    <section className="py-14 md:px-20 px-5 grid grid-cols-1 md:grid-cols-3 gap-6">
      <CartSection />
      <Summary />
    </section>
  );
};
export default CartPage;
