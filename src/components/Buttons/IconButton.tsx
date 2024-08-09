import styled from "styled-components";

import { pxToRem } from "~/utils/pxToRem";

export const IconButtonStyled = styled.button`
  cursor: pointer;
  border: ${pxToRem(2)} solid #64a98c;
  width: fit-content;
  padding: 0.25rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  svg {
    color: #64a98c;
  }
`;

type IconButtonProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = (props: IconButtonProps) => {
  return <IconButtonStyled {...props}>{props.children}</IconButtonStyled>;
};
