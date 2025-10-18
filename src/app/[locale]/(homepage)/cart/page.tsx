"use client";
import useFetchCart from "./_hooks/use-fetch-cart";

const CartPage = () => {
  const { payload, isLoading } = useFetchCart();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(payload?.cart.cartItems[0].product.title);

  return (
    <div>
      <h1>{payload?.cart.totalPrice}</h1>
    </div>
  );
};
export default CartPage;
