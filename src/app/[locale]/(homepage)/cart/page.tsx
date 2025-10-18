"use client";
import useFetchCart from "./_hooks/use-fetch-cart";
import UserCartCard from "./_components/user-cart-card";

const CartPage = () => {
  const { payload, isLoading } = useFetchCart();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {payload?.cart.cartItems.map((item) => {
        return <UserCartCard key={item._id} item={item} />;
      })}
    </div>
  );
};
export default CartPage;
