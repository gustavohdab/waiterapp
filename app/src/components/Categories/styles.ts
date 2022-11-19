import { Platform } from "react-native";
import styled from "styled-components/native";

const isAndroid = Platform.OS === "android";

export const CategoryContainer = styled.TouchableOpacity`
  align-items: center;
  margin-left: 8px;
  width: 90px;
`;

export const Icon = styled.View`
  background: #fff;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, ${isAndroid ? 15 : 0.15});
  elevation: 3;
`;
