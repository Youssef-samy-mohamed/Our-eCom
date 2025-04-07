import { TProduct } from "@customTypes/product"
import CartItem from "../CartItem/CartItem"



type cartItemListProps = {
  products: TProduct[];
  changeQunatityHandler:(id: number, quantity: number) => void
  removeProductHandler: (id: number) => void
};


const CartItemList = ({
  products,changeQunatityHandler, removeProductHandler }: cartItemListProps) => {

  const renderList = products.map((el) => (
    <CartItem key={el.id} {...el} changeQunatityHandler={changeQunatityHandler} removeProductHandler={removeProductHandler}/>
  ));

  return <div>{renderList}</div>;
};

export default CartItemList 