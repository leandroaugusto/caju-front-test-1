import styled from "styled-components";

import { pxToRem } from "~/utils/pxToRem";

export const Card = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top : 2rem;
  border-radius: 0.5rem;
  padding: 2rem 1.5rem;
  background-color: #fff;
  justify-content: center;
  box-shadow: 0 ${pxToRem(1)} ${pxToRem(3)} rgba(0,0,0,0.12), 0 ${pxToRem(1)} ${pxToRem(2)} rgba(0,0,0,0.24);

  h3 {
    margin: 0;
  }
`;
