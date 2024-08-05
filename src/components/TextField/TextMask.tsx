import InputMask from "react-input-mask";

import { ITextMaskFieldProps } from "./types";
import { TextField } from ".";

export const TextMaskField = ({
  value,
  mask,
  onChange,
  ...rest
}: ITextMaskFieldProps) => {
  return (
    <InputMask mask={mask} value={value} onChange={onChange}>
      <TextField type="text" {...rest} />
    </InputMask>
  );
};
