import InputMask from "react-input-mask";

import { ITextMaskFieldProps } from "./types";
import { TextField } from ".";

export const TextMaskField = ({
  id,
  mask,
  value,
  register,
  onChange,
  ...rest
}: ITextMaskFieldProps) => (
  <InputMask mask={mask} value={value} onChange={onChange} {...rest}>
    <TextField id={id} register={register} />
  </InputMask>
);
