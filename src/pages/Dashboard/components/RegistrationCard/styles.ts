import styled from "styled-components";

import { pxToRem } from "~/utils/pxToRem";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border: 0.25rem solid #fff;
  margin: 1rem;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #fff;
  h3,
  p {
    margin: 0;
  }
  box-shadow: 0 ${pxToRem(1)} ${pxToRem(3)} rgba(0,0,0,0.12), 0 ${pxToRem(1)} ${pxToRem(2)} rgba(0,0,0,0.24);
`;

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Actions = styled.div`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-column-gap: ${pxToRem(10)};

  svg {
    cursor: pointer;
  }
`;
