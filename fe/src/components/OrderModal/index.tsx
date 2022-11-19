import { useEffect } from "react";
import closeIcon from "../../assets/images/close-icon.svg";
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";

import { Actions, ModalBody, OrderDetails, Overlay } from "./styles";

/* Defining the props that the component will receive. */
interface OrderModalProps {
  visible: boolean;
  order: null | Order;
  onClose: () => void;
  onCancelOrder: () => void;
  isLoading: boolean;
  onChangeOrderStatus: () => void;
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onChangeOrderStatus,
}: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  /* If the modal is not visible or the order is null, then return null. */
  if (!visible || !order) {
    return null;
  }

  /* Calculating the total price of the order. */
  const total = order.products.reduce((acc, { product, quantity }) => {
    return acc + product.price * quantity;
  }, 0);

  /* Returning the JSX code for the modal. */
  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalBody>
        <header>
          <strong>Mesa - {order.table}</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="close X icon svg" />
          </button>
        </header>
        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === "WAITING" && "🕒"}
              {order.status === "IN_PRODUCTION" && "🧑‍🍳"}
              {order.status === "DONE" && "✅"}
            </span>
            <strong>
              {order.status === "WAITING" && "Fila de espera"}
              {order.status === "IN_PRODUCTION" && "Em preparação"}
              {order.status === "DONE" && "Pronto!"}
            </strong>
          </div>
        </div>
        <OrderDetails>
          <strong>Itens</strong>
          <div className="order-items">
            {order.products.map((product) => (
              <div key={product._id}>
                <div className="item">
                  <img
                    src={`http://localhost:3001/uploads/${product.product.imagePath}`}
                    alt={product.product.name}
                    width="70"
                    height="40"
                  />
                  <span className="quantity">{product.quantity}x</span>
                  <div className="product-details">
                    <strong>{product.product.name}</strong>
                    <span>{formatCurrency(product.product.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <span>Total</span>
            {<strong>{formatCurrency(total)}</strong>}
          </div>
          <Actions>
            {order.status !== "DONE" && (
              <button
                type="button"
                className="primary"
                disabled={isLoading}
                onClick={onChangeOrderStatus}
              >
                <span>
                  {order.status === "WAITING" && "🧑‍🍳"}
                  {order.status === "IN_PRODUCTION" && "✅"}
                </span>
                <strong>
                  {order.status === "WAITING" && "Iniciar Preparo"}
                  {order.status === "IN_PRODUCTION" && "Pronto!"}
                </strong>
              </button>
            )}
            <button type="button" className="secondary" onClick={onCancelOrder}>
              Cancelar Pedido
            </button>
          </Actions>
        </OrderDetails>
      </ModalBody>
    </Overlay>
  );
}
