import { FlatList } from "react-native";
import { useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { Text } from "../Text";
import {
  ProductCard,
  ProductCardImage,
  ProductDetails,
  Separator,
  AddToCartButton,
} from "./styles";
import { Product } from "../../types/product";

interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenProductModal(product: Product) {
    setProductModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={productModalVisible}
        onClose={() => setProductModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
      <FlatList
        style={{ marginTop: 32 }}
        data={products}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={(product) => product._id}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item: product }) => (
          <ProductCard onPress={() => handleOpenProductModal(product)}>
            <ProductCardImage
              source={{
                uri: `http://192.168.1.87:3001/uploads/${product.imagePath}`,
              }}
            />
            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text size={14} weight="600">
                {formatCurrency(product.price)}
              </Text>
            </ProductDetails>
            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductCard>
        )}
      />
    </>
  );
}
