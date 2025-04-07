import { useAppDispatch } from "@store/hooks";
import actPlaceOrder from "@store/orders/act/actPlaceOrder";
import { useState } from "react";
import { TProduct } from "@customTypes/product";
import styles from "./CartSubtotalPrice.module.css";
import { Button, Modal , Spinner } from "react-bootstrap";
import { clearCartAfterPlaceOrder } from "@store/cart/cartSlice";

type CartSubTotalPriceProps = {
  products: TProduct[];
  userAccessToken: string | null;
};

const CartSubTotalPrice = ({
  products,
  userAccessToken,
}: CartSubTotalPriceProps) => {



  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const dispatch = useAppDispatch();

  const subTotal = products.reduce((acc, el) => {
    if (typeof el.quantity !== "number" || isNaN(el.quantity)) {
      return acc; // Skip this product if quantity is not a valid number
    }
    return acc + el.price * el.quantity;
  }, 0);


const modalHandler = () => {
  setShowModal(!showModal);
  setError(null);

}

const placeOrderHandler = () => {
  dispatch(actPlaceOrder(subTotal)).unwrap().then(() => {
    dispatch(clearCartAfterPlaceOrder())
    setShowModal(false);
  })
  .catch((error) => {
    setError(error);
  })
  .finally(() => {
    setLoading(false);
  });
}


  return (
    <>
      <Modal show={showModal} onHide={modalHandler} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place this order Subtotal:{" "}
          {subTotal.toFixed(2)} EGP
          {!loading && error && <p style={{ color: "red" }}>{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={placeOrderHandler}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{subTotal.toFixed(2)}</span>
      </div>
      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <span>
            <Button
              variant="info"
              style={{ color: "white" }}
              onClick={modalHandler}
            >
              Place Order
            </Button>
          </span>
        </div>
      )}
    </>
  );
};

export default CartSubTotalPrice;
