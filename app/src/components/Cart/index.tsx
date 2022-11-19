import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/CartItems";
import { Product } from "../../types/product";
import { api } from "../../utils/api";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import { Text } from "../Text";
import {
  CartActions,
  CartItemWrapper,
  CartProduct,
  Image,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from "./styles";

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmOrder,
  selectedTable,
}: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [orderConfirmedModalVisible, setOrderConfirmedModalVisible] =
    useState(false);

  const total = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);
    await api.post("/orders", {
      table: selectedTable,
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
    });
    setIsLoading(false);

    setOrderConfirmedModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setOrderConfirmedModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal
        visible={orderConfirmedModalVisible}
        onClose={handleOk}
      />
      {cartItems.length > 0 && (
        <FlatList
          style={{ marginBottom: 20, maxHeight: 150 }}
          data={cartItems}
          keyExtractor={(cartItems) => cartItems.product._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: CartItem }) => (
            <CartItemWrapper>
              <CartProduct>
                <Image
                  source={{
                    uri: `http://192.168.1.87:3001/uploads/${CartItem.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color={"#666"}>
                    {CartItem.quantity}x
                  </Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight="600">
                    {CartItem.product.name}
                  </Text>
                  <Text size={14} color={"#666"} style={{ marginTop: 4 }}>
                    {CartItem.product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Text>
                </ProductDetails>
              </CartProduct>
              <CartActions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAdd(CartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(CartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </CartActions>
            </CartItemWrapper>
          )}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text weight={"600"} size={20}>
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Carrinho vazio</Text>
          )}
        </TotalContainer>
        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          isLoading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
}
