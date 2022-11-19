import styled from "styled-components/native";

export const ProductCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
export const ProductCardImage = styled.Image`
  width: 120px;
  height: 96px;
  border-radius: 8px;
`;
export const ProductDetails = styled.View`
  margin-left: 16px;
  flex: 1;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #e2e2e2;
  margin: 24px 0;
`;

export const AddToCartButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
`;
