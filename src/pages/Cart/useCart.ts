import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
} from "@store/cart/cartSlice";
import { resetOrderStatus } from "@store/orders/orderSlice";

const useCart = () => {
  const dispatch = useAppDispatch();

  const { items, loading, productsFullInfo, error } = useAppSelector(
    (state) => state.cart
  );



const userAccessToken = useAppSelector((state) => state.auth.accessToken);

const placeOrderStatus = useAppSelector((state) => state.orders.loading);





  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id] || 0,
  })); // this is to get the quantity of each product // will get all the products and then add the quantity

  // change quantity of each product

  const changeQunatityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeProductHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );


    useEffect(() => {
      const promise = dispatch(actGetProductsByItems());
      return () => {
        dispatch(cleanCartProductsFullInfo());
        dispatch(resetOrderStatus());
        promise.abort();
      };
    }, [dispatch]);



  return {
    loading,
    error,
    products,
    changeQunatityHandler,
    removeProductHandler,
    userAccessToken,
    placeOrderStatus,
  };
};

export default useCart;
