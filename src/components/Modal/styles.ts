import styled from "styled-components";

export const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  opacity: ${({ $open }) => ($open ? "1" : "0")};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  pointer-events: ${({ $open }) => ($open ? "all" : "none")};
  transition: opacity 0.3s;
`;

export const Content = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  transition: opacity 0.3s;
  z-index: 2;
  gap: 1.2rem;
  opacity: ${({ $open }) => ($open ? "1" : "0")};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  pointer-events: ${({ $open }) => ($open ? "all" : "none")};
`;

export const Title = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;
