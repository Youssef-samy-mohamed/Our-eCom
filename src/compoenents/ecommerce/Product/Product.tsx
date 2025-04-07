import { TProduct } from "../../../types/product";
import styles from "./Product.module.css";
import { useAppDispatch } from "../../../store/hooks";
import { actLikeToggle } from "@store/wishList/wishListSlice";
import { addToCart } from "../../../store/cart/cartSlice";
import { useEffect , useState , memo } from "react";
import Like from '../../../assets/like.svg?react'
import Likefill from '../../../assets/like-fill.svg?react'
import { Button, Spinner } from "react-bootstrap";

import ProductInfo from "src/compoenents/ProductInfo/ProductInfo";



const Product = memo( ({ title, price, img , id , max , quantity , isLiked = false} : TProduct ) => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

  useEffect(() => {
    if (!isBtnDisabled) return;

    const debonce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => {
      clearTimeout(debonce);
    };
  }, [isBtnDisabled]);

  const dispatch = useAppDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };

  const likeToggleHandler = () => {
    if (isLoading) return;
    setIsLoading(true);
    dispatch(actLikeToggle(id))
      .unwrap()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }; // unwrap() Says, "Stop! Let’s check if this action was successful or not." /  when success then set loading to false/ and then use catch to catch the error

  return (
    <ProductInfo title={title} img={img} price={price} direction="row" >
      <div className={styles.wishlistBtn} onClick={likeToggleHandler}>
        {isLoading ? (
          <Spinner animation="border" size="sm" variant="primary" />
        ) : isLiked ? (
          <Likefill />
        ) : (
          <Like />
        )}
      </div>

      
      <p className={styles.maximumNotice}>
        {quantityReachedToMax
          ? "Quantity reached to max Qunatity"
          : `Remaining quantity: ${currentRemainingQuantity}`}
      </p>
      <Button
        variant="info"
        style={{ color: "white" , width:"100%" }}
        onClick={addToCartHandler}
        disabled={isBtnDisabled || quantityReachedToMax}
      >
        {isBtnDisabled ? (
          <>
            <Spinner animation="border" size="sm" />
          </>
        ) : (
          "Add to cart"
        )}
      </Button>
    </ProductInfo>
  );
});

export default Product;
