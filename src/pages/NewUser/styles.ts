import styled from "styled-components";
import { IconButtonStyled } from "~/components/Buttons/IconButton";
import Button from "~/components/Buttons";
import { pxToRem } from "~/utils/pxToRem";


export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
`;

export const Form = styled.form`
  display: grid;
  grid-row-gap: 1rem;
`;

export const Card = styled.div`
  border: ${pxToRem(2)} solid #f0f0f0;
  width: 500px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
 
  ${IconButtonStyled} {
    align-items: flex-start;
  }

  ${Button}{
    justify-self: end;
  }
`;
