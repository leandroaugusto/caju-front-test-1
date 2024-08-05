import { Input } from "./styles";
import { ITextFieldProps } from "./types";

export const TextField = ({
  id,
  label,
  type = "text",
  error,
  ...rest
}: ITextFieldProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <Input type={type} {...rest} />
      <span style={{ fontSize: 12, color: "red" }}>{error}</span>
    </div>
  );
};
