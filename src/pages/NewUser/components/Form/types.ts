import { InputHTMLAttributes } from "react";

import { UseFormRegister, FieldErrors } from "react-hook-form"

import { TFieldValues } from "~/types/registrations.types"

export interface IFormProps {
  errors: FieldErrors<TFieldValues>;
  registerWithMask: (fieldName: keyof TFieldValues, mask: string) => InputHTMLAttributes<HTMLInputElement>;
  onSubmit: (data: TFieldValues) => void;
  register: UseFormRegister<TFieldValues>;
}
