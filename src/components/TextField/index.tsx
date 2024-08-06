import { Input } from "./styles";
import { ITextFieldProps } from "./types";

export const TextField = ({
  id,
  label = "Campo de texto",
  type = "text",
  placeholder,
  register,
  required = false,
  error,
  ...rest
}: ITextFieldProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <Input
        {...register(label, { required })}
        name={id}
        type={type}
        placeholder={placeholder || label}
        {...rest}
      />
      <span style={{ fontSize: 12, color: "red" }}>{error}</span>
    </div>
  );
};
