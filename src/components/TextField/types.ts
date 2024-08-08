import { InputHTMLAttributes } from "react";

export interface ITextFieldProps extends InputHTMLAttributes<any> {
  id: string;
  label?: string;
  required?: boolean;
  error?: string;
  ref?: React.Ref<React.ElementRef<"input">>;
};
