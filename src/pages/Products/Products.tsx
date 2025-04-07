import useProducts from "./useProducts";
import { Product } from "../../compoenents/ecommerce";
import { Loading } from "../../compoenents/feedback";
import { GridList, Heading } from "../../compoenents/common";
import { TProduct } from "@customTypes/product";

const Products = () => {
  const { loading, error, productsFullInfo, productPrefix } = useProducts();

  return (
    <>
      <Heading title={`${productPrefix?.toUpperCase()} Products`} />
      <Loading status={loading} error={error} type="product">
        <GridList<TProduct>
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Products;
