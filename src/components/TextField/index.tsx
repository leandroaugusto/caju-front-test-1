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
    { id, label, type = "text", placeholder, error, ...rest }: ITextFieldProps,
    ref
  ) => {
    return (
      <S.Fieldset>
        {label && (
          <S.Label $error={!!error} htmlFor={id}>
            {label}
          </S.Label>
        )}

        <S.Input
          {...rest}
          id={id}
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
