import styled from "styled-components/native";

export const CartItemWrapper = styled.View`
  flex-direction: row;
  padding: 8px 0;
  border-bottom-width: 0.3px solid #666;
  align-items: center;
  justify-content: space-between;
`;

export const CartProduct = styled.View`
  flex-direction: row;
`;

export const CartActions = styled.View`
  flex-direction: row;
`;

export const Image = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 6px;
`;

export const QuantityContainer = styled.View`
  min-width: 20px;
  margin-left: 12px;
`;

export const ProductDetails = styled.View`
  margin-left: 12px;
`;

export const Summary = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalContainer = styled.View`
  margin-right: 32px;
  flex: 1;
`;
