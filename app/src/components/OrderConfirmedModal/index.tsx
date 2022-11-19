import { Modal } from "react-native";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";
import { Container, OkButton } from "./styles";

interface OrderConfirmedModalProps {
  visible: boolean;
  onClose: () => void;
}

export function OrderConfirmedModal({
  visible,
  onClose,
}: OrderConfirmedModalProps) {
  function autoCloseInXSeconds() {
    setTimeout(() => {
      onClose();
    }, 4000);
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
      onShow={autoCloseInXSeconds}
    >
      <Container>
        <CheckCircle />
        <Text size={24} weight={"600"} color={"#fff"} style={{ marginTop: 12 }}>
          Pedido confirmado!
        </Text>
        <Text size={16} color={"#fff"} opacity={0.9} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>
        <OkButton onPress={onClose}>
          <Text weight={"600"} color={"#d73035"}>
            Ok
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
