import { InputHTMLAttributes } from "react";

export interface ITextFieldProps extends InputHTMLAttributes<any> {
  label?: string;
  error?: string;
};

export interface ITextMaskFieldProps extends ITextFieldProps {
  mask: string
}
