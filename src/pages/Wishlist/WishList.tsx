import useWishlist from "./useWishlist";
import { Heading, GridList } from "src/compoenents/common";
import { Product } from "src/compoenents/ecommerce";
import { Loading } from "src/compoenents/feedback";
import { TProduct } from "@customTypes/product";





const Wishlist = () => {
  const { loading, error, records } = useWishlist();

  return (
    <>
      <Heading title="Your Wishlist"/>
      <Loading status={loading} error={error}>
        <GridList<TProduct>
          emptyMessage="Your Wishlist is Empty"
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;