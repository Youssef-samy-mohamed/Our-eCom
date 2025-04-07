import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrders } from "@store/orders/orderSlice";
import { resetOrderStatus } from "@store/orders/orderSlice";
import { TProduct } from "@customTypes/product";

const useOrders = () => {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const viewDetailsHandler = (id: number) => {
    const productDetails = orderList.find((el) => el.id === id);
    const newItems = productDetails?.items ?? [];

    setSelectedProduct((prev) => [...prev, ...newItems]);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  const { loading, error, orderList } = useAppSelector((state) => state.orders);

  return {
    loading,
    error,
    orderList,
    viewDetailsHandler,
    showModal,
    handleClose,
    selectedProduct,
  };
};

export default useOrders;
