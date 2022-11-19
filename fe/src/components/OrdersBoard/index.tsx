import { useState } from "react";
import { toast } from "react-toastify";
import { Order } from "../../types/Order";
import { api } from "../../utils/api";
import { OrderModal } from "../OrderModal";
import { Board, OrdersContainer } from "./styles";

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onOrderStatusChange: (orderId: string, status: Order["status"]) => void;
}

export function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onOrderStatusChange,
}: OrdersBoardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenOrder(order: Order) {
    setIsModalOpen(true);
    setSelectedOrder(order);
  }

  function handleCloseOrder() {
    setIsModalOpen(false);
    setSelectedOrder(null);
  }

  // function handleChangeOrdersStatus to IN_PRODUCTION or DONE
  async function handleChangeOrdersStatus() {
    setIsLoading(true);

    const status =
      selectedOrder?.status === "WAITING" ? "IN_PRODUCTION" : "DONE";

    await api.patch(`/orders/${selectedOrder?._id}`, { status });

    onOrderStatusChange(selectedOrder!._id, status);
    setIsLoading(false);
    handleCloseOrder();
    toast.success(
      `O pedido da mesa ${selectedOrder?.table} foi alterado para ${status}`
    );
  }

  async function handleCancelOrder() {
    setIsLoading(true);
    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(
      `O Pedido da mesa ${selectedOrder?.table} foi cancelado com sucesso!`
    );
    setIsLoading(false);
    handleCloseOrder();
    onCancelOrder(selectedOrder!._id);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalOpen}
        order={selectedOrder}
        onClose={handleCloseOrder}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrdersStatus}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>
      <OrdersContainer>
        {orders.map((order) => (
          <button
            type="button"
            key={order._id}
            onClick={() => handleOpenOrder(order)}
          >
            <strong>Mesa {order.table}</strong>
            <span>{order.products.length} itens </span>
          </button>
        ))}
      </OrdersContainer>
    </Board>
  );
}
