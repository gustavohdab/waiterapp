import styled from "styled-components";

export const Board = styled.div`
  padding: 1rem;
  border: 0.0625rem solid #e6e6e6;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  > header {
    padding: 0.5rem;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 1.5rem;

  button {
    background: white;
    border: 0.0625rem solid #e6e6e6;
    border-radius: 0.5rem;
    height: 128px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.2s;

    strong {
      font-weight: 500;
    }

    span {
      font-size: 0.875rem;
      color: #666;
    }

    &:hover {
      border-color: #999;
    }

    &:active {
      border-color: #777;
    }

    &:active {
      border-color: white;
    }

    & + button {
      margin-top: 1.5rem;
    }
  }
`;
