import { Container } from "./styles";
import socketIo from "socket.io-client";
import { OrdersBoard } from "../OrdersBoard";
import { Order } from "../../types/Order";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo("http://localhost:3001", {
      transports: ["websocket"],
    });

    socket.on("orders@new", (order: Order) => {
      setOrders((prev) => [order, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    api.get("/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  const waitingOrders = orders.filter((order) => order.status === "WAITING");
  const inProductionOrders = orders.filter(
    (order) => order.status === "IN_PRODUCTION"
  );
  const doneOrders = orders.filter((order) => order.status === "DONE");

  function handleCancelOrder(orderId: string) {
    const updatedOrders = orders.filter((order) => order._id !== orderId);
    setOrders(updatedOrders);
  }

  function handleOrderStatusChange(orderId: string, status: Order["status"]) {
    const updatedOrders = orders.map((order) => {
      if (order._id === orderId) {
        return {
          ...order,
          status,
        };
      }

      return order;
    });

    setOrders(updatedOrders);
  }

  return (
    <Container>
      <OrdersBoard
        icon={"🕒"}
        title={"Fila de espera"}
        orders={waitingOrders}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
      <OrdersBoard
        icon={"🧑‍🍳"}
        title={"Em preparação"}
        orders={inProductionOrders}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
      <OrdersBoard
        icon={"✅"}
        title={"Pronto!"}
        orders={doneOrders}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
    </Container>
  );
}
