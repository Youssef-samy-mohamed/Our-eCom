import styles from './styles.module.css'
import { Form, Button } from "react-bootstrap";
import { TProduct } from '@customTypes/product';
import { memo } from 'react';
import ProductInfo from 'src/compoenents/ProductInfo/ProductInfo';



const { cartItem, cartItemSelection } =
  styles;


type cartItemListProps = TProduct & {
  changeQunatityHandler: (id: number, quantity: number) => void;
  removeProductHandler: (id: number) => void;
};



const CartItem  = memo( ({ id ,title , price , img , max , quantity , changeQunatityHandler , removeProductHandler} : cartItemListProps) => {


  // render optinos list

  const renderOptions = Array(max).fill(0).map((_ , index) => 
  {
    const quantity = ++index;
    return <option key={quantity} value={quantity}>{quantity}</option>
  });


  // change quantity

  const changeQunatity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = +event.target.value;
    changeQunatityHandler(id, quantity);
  }


  return (
    <div className={cartItem}>
      <ProductInfo title={title} img={img} price={price} direction="column">
        <Button
          variant="secondary"
          style={{ color: "white", width: "100px" }}
          className="mt-auto"
          onClick={() => removeProductHandler(id)}
        >
          Remove
        </Button>
      </ProductInfo>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select
          aria-label="Default select example"
          value={quantity}
          onChange={changeQunatity}
        >
          {renderOptions}
        </Form.Select>
      </div>
    </div>
  );
}
)

export default CartItem;