import styled from "styled-components";

import { pxToRem } from "~/utils/pxToRem";

export const Input = styled.input`
  padding: 0 0.5rem;
  vertical-align: middle;
  border-radius: ${pxToRem(2)};
  width: 100%;
  min-height: ${pxToRem(36)};
  background-color: #ffffff;
  border: ${pxToRem(1)} solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 1rem;
  line-height: ${pxToRem(18)};
  font-weight: normal;
  border-radius: 0.25rem;
  :focus {
    outline: none;
    border: ${pxToRem(1)} solid #007c89;
    box-shadow: inset 0 0 0 ${pxToRem(1)} #007c89;
  }
`;
