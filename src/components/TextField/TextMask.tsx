import { withMask } from "use-mask-input";

import { ITextFieldProps } from "./types";
import { TextField } from ".";

export const TextCpfMaskField = ({ ...props }: ITextFieldProps) => {
  return <TextField ref={withMask("999.999.999-99")} {...props} />;
};
