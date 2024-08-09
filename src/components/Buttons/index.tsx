import styled from "styled-components";

import { pxToRem } from "~/utils/pxToRem";

const Button = styled.button`
  /* outline: none; */
  display: flex;
  align-items: center;
  border: none;
  border-radius: ${pxToRem(36)};
  padding: 0.5rem 2rem;
  background-color: #64a98c;
  cursor: pointer;
  height: ${pxToRem(56)};
  color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
`;

export const ButtonSmall = styled.button<{
  $buttonTheme: "approved" | "reproved" | "review";
  color?: string;
}>`
  font-size: ${pxToRem(12)};
  /* outline: none; */
  border-radius: 0.25rem;
  border: none;
  padding: 0.25rem 1rem;
  background-color: ${({ $buttonTheme, theme }) =>
    theme.colors.buttons[$buttonTheme] ?? theme.colors.primary};
  color: ${({ color }) => color ?? "#000"};
  cursor: pointer;
`;

export default Button;
