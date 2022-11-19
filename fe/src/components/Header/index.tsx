import logo from "../../assets/images/logo.svg";
import { Container, Content } from "./styles";

export function Header() {
  return (
    <Container>
      <Content>
        <div className="page-details">
          <h1>Pedidos</h1>
          <h2>Acompanhe os pedidos dos seus clientes</h2>
        </div>

        <img src={logo} alt="waiterapp" />
      </Content>
    </Container>
  );
}
