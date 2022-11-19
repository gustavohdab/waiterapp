import styled from "styled-components";

export const Container = styled.header`
  background: #d73035;
  display: flex;
  justify-content: center;
  height: 12.375rem;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 76rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: 25rem;

    h1 {
      font-size: 2rem;
      color: #fff;
    }

    h2 {
      font-size: 1rem;
      font-weight: 400;
      opacity: 0.9;
      color: #fff;
      margin-top: 0.375rem;
    }
  }
`;
