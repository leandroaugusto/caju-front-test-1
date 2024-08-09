import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.5rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

export const Column = styled.div<{ $status: string }>`
  height: auto;
  background-color: ${({ $status, theme }) =>
    theme.colors.columns[$status].background};
  border-radius: 2rem;
  min-height: 80vh;
  max-height: 80vh;
`;

export const TitleColumn = styled.h3<{ $status: string }>`
  margin: 0;
  color: ${({ $status, theme }) => theme.colors.columns[$status].title};
  margin: 1.5rem;
`;

export const CollumContent = styled.div`
  overflow: auto;
  max-height: 85%;
`;
