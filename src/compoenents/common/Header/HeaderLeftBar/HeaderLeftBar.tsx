import WishlistIcon from "../../../../assets/wishlist.svg?react";
import CartIcon from "../../../../assets/cart.svg?react";
import styles from "./HeaderLeftBar.module.css";
import HeaderCounter from "../HeaderCounter/HeaderCounter";
import { useAppSelector } from "@store/hooks";
import { getCartTotalQuanitySelector } from "@store/cart/selectors";

const HeaderLeftBar = () => {
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );
  const cartTotalQuantity = useAppSelector(getCartTotalQuanitySelector);

  return (
    <div className={styles.headerLeftBar}>
      <HeaderCounter
        to="wishlist"
        totalQuantity={wishlistTotalQuantity}
        svgIcon={<WishlistIcon title="wishlist icon" />}
        title={"Wishlist"}
      />
      <HeaderCounter
        to="cart"
        totalQuantity={cartTotalQuantity}
        svgIcon={<CartIcon title="cart icon" />}
        title={"Cart"}
      />
    </div>
  );
};

export default HeaderLeftBar;
