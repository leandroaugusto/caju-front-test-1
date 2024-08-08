import { forwardRef } from "react";
import { Input } from "./styles";
import { ITextFieldProps } from "./types";

export const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
  (
    {
      id,
      label = "Campo de texto",
      type = "text",
      placeholder,
      register,
      registerWithMask,
      required = false,
      error,
      ...rest
    },
    ref
  ) => {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <Input
          {...(register && register(id, { required }))}
          {...(registerWithMask &&
            registerWithMask(id, "999.999.999-99", { required }))}
          name={id}
          type={type}
          ref={ref}
          placeholder={placeholder || label}
          {...rest}
        />
        <span style={{ fontSize: 12, color: "red" }}>{error}</span>
      </div>
    );
  }
);
