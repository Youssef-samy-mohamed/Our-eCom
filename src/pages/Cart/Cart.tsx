import { Heading } from "src/compoenents/common"
import { CartItemList, CartSubTotalPrice } from "src/compoenents/ecommerce"
import { Loading } from "src/compoenents/feedback";
import useCart from "./useCart";
import LottieHandler from "src/compoenents/feedback/LottieHandler/LottieHandler";

const Cart = () => {


  const {
    loading,
    error,
    products,
    changeQunatityHandler,
    removeProductHandler,
    userAccessToken,
    placeOrderStatus,
  } = useCart();

  return (
    <>
      <Heading title="Cart" />

      <Loading status={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQunatityHandler={changeQunatityHandler}
              removeProductHandler={removeProductHandler}
            />

            <CartSubTotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        ) : placeOrderStatus === "succeeded" ? (
          <LottieHandler type="success" message="Yur order has been placed Successfully" />
        ) : (
          <LottieHandler type="empty" message="Your cart is empty" />
        )}
      </Loading>
    </>
  );
}

export default Cart