import styled from "styled-components";

import { pxToRem } from "~/utils/pxToRem";

export const Fieldset = styled.fieldset`
  border: 0;
  padding: 0;
  margin: 0;
`;

export const Label = styled.label<{ $error?: boolean }>`
  color: ${({ $error }) => ($error ? "#ff0000" : "initial")};
`;

export const Input = styled.input<{ $error?: boolean }>`
  padding: 0 0.5rem;
  vertical-align: middle;
  border-radius: ${pxToRem(2)};
  width: 100%;
  min-height: ${pxToRem(36)};
  background-color: #ffffff;
  border: ${pxToRem(1)} solid ${({ $error }) => ($error ? "#ff0000" : "#241c154d")};
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

export const TagError = styled.span`
  font-size: ${pxToRem(12)};
  color: #ff0000;
`
