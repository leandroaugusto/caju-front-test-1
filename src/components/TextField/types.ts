import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form"

export interface ITextFieldProps extends InputHTMLAttributes<any> {
  id: string,
  register: UseFormRegister<any>
  label?: string;
  required?: boolean;
  error?: string;
};

export interface ITextMaskFieldProps extends ITextFieldProps {
  mask: string;
}
