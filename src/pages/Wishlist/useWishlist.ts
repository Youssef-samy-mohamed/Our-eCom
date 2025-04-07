import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  actGetWishlist,
  productsFullInfoCleanUp,
} from "@store/wishList/wishListSlice";


const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const promise = dispatch(actGetWishlist());
    return () => {
      promise.abort();
      dispatch(productsFullInfoCleanUp());
    };
  }, [dispatch]);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: true,
  }));

  return { records, loading, error };
};

export default useWishlist;
