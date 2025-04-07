import { Heading } from "src/compoenents/common";
import { Table, Modal } from "react-bootstrap";
import { Loading } from "src/compoenents/feedback";
import ProductInfo from "src/compoenents/ProductInfo/ProductInfo";
import useOrders from "./useOrders";


const Orders = () => {
  
  const { loading, error, orderList, viewDetailsHandler, handleClose, showModal, selectedProduct } = useOrders();

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedProduct.map((el) => <ProductInfo key={el.id} {...el} quantity={el.quantity} direction="column" style={{marginBottom: "10px"}}/> )}</Modal.Body>

          
      </Modal>
      <Heading title="Orders" />
      <Loading status={loading} error={error} type="category">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Orer Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((el) => (
              <tr key={el.id}>
                <td>#{el.id}</td>
                <td>
                  {el.items.length} item(s){" / "}{" "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => viewDetailsHandler(el.id)}
                  >
                    Product Details{" "}
                  </span>{" "}
                </td>
                <td>{el.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Orders;
