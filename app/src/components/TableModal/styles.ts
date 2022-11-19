import styled from "styled-components/native";

export const Overlay = styled.KeyboardAvoidingView`
  background: rgba(0, 0, 0, 0.6);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalBody = styled.View`
  background: #fff;
  width: 90%;
  border-radius: 8px;
  padding: 20px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ModalForm = styled.View`
  margin-top: 20px;
`;

export const Input = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;
