import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { api } from "../utils/api";

import { Button } from "../components/Button";
import { Cart } from "../components/Cart";
import { Categories } from "../components/Categories";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { TableModal } from "../components/TableModal";
import { CartItem } from "../types/CartItems";
import { Product } from "../types/product";
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
  CenteredContainer,
} from "./styles";
import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";
import { Category } from "../types/Category";

export function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([api.get("/categories"), api.get("/products")]).then(
      ([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
        setIsLoading(false);
      }
    );
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? "/products"
      : `/categories/${categoryId}/products`;
    setIsLoadingProducts(true);
    const { data } = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleAddToCart(product: Product) {
    const productAlreadyExists = cartItems.find(
      (item) => item.product._id === product._id
    );

    if (!selectedTable) {
      setModalVisible(true);
      return;
    }

    if (productAlreadyExists) {
      setCartItems(
        cartItems.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  }

  function handleRemoveFromCart(product: Product) {
    const productAlreadyExists = cartItems.find(
      (item) => item.product._id === product._id
    );

    if (productAlreadyExists) {
      if (productAlreadyExists.quantity === 1) {
        setCartItems(
          cartItems.filter((item) => item.product._id !== product._id)
        );
      } else {
        setCartItems(
          cartItems.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }
    }
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
    alert(`Mesa ${table} salva com sucesso!`);
  }

  function handleResetOrder() {
    setSelectedTable("");
    setCartItems([]);
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator size="large" color="#d73035" />
          </CenteredContainer>
        ) : (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator size="large" color="#d73035" />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu onAddToCart={handleAddToCart} products={products} />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text weight="600" style={{ marginTop: 24 }} color={"#666"}>
                      Nenhum produto encontrado
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setModalVisible(true)} disabled={isLoading}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleRemoveFromCart}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </FooterContainer>
      </Footer>
      <TableModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
