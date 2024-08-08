import { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

import { TFieldValues } from "~/types/registrations.types";

import * as S from "./styles";
import { ITextFieldProps } from "./types";

export const TextField = forwardRef<
  HTMLInputElement,
  ITextFieldProps & ReturnType<UseFormRegister<TFieldValues>>
>(
  (
    {
      id,
      label = "Campo de texto",
      type = "text",
      placeholder,
      error,
      ...rest
    },
    ref
  ) => {
    return (
      <S.Fieldset>
        <label htmlFor={id}>{label}</label>
        <S.Input
          {...rest}
          name={id}
          type={type}
          ref={ref}
          $error={!!error}
          placeholder={placeholder || label}
        />
        <S.TagError>{error}</S.TagError>
      </S.Fieldset>
    );
  }
);
