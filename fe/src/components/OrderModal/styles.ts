import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const ModalBody = styled.div`
  background-color: #fff;
  border-radius: 0.625rem;
  box-shadow: 0 0 3.75rem rgba(0, 0, 0, 0.05);
  padding: 2rem 2.5rem 2.5rem;
  width: 100%;
  max-width: 36rem;
  position: relative;
  display: flex;
  flex-direction: column;

  header {
    strong {
      font-size: 1.5rem;
    }

    button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: 0;
      color: #999;
      transition: color 0.2s;
    }
  }

  .status-container {
    margin-top: 2rem;

    small {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    div {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      margin-top: 0.5rem;
    }
  }
`;

export const OrderDetails = styled.div`
  margin-top: 2rem;

  > strong {
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0.8;
  }

  .order-items {
    margin-top: 1rem;

    .item {
      display: flex;
      margin-bottom: 1rem;
      border-radius: 0.625rem;

      > img {
        width: 4.125rem;
        height: 3.125rem;
        object-fit: cover;
        border-radius: 0.625rem;
      }

      & + .item {
        margin-top: 1rem;
      }
      .quantity {
        font-size: 14px;
        color: #666;
        font-weight: 500;
        display: block;
        min-width: 1.5rem;
        margin-left: 0.5rem;
      }

      .product-details {
        strong {
          display: block;
        }
      }
    }
  }

  .total {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 0.875rem;
      font-weight: 500;
      opacity: 0.8;
    }
  }
`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .primary {
    background: #333;
    border-radius: 3rem;
    border: 0;
    color: #fff;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
      background: #444;
    }
  }

  .secondary {
    background: #fff;
    border-radius: 3rem;
    border: 0.0625rem solid #333;
    color: red;
    padding: 0.75rem 1.5rem;
    display: flex;
    justify-content: center;
    margin-top: 0.75rem;
    font-weight: 500;

    &:hover {
      background: #eee;
    }
  }
`;
