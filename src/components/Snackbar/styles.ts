import styled from "styled-components";

export const Container = styled.div<{ $visible: boolean }>`
  width: 300px;
  border-radius: 0.5rem;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 2rem;
  left: 2rem;
  gap: 1rem;
  padding: 0.8rem 1rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
`;

export const Text = styled.p`
  margin: 0;
  padding: 0;
`;
