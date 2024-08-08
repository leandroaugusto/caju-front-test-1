import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form"

export interface ITextFieldProps extends InputHTMLAttributes<any> {
  id: string;
  register?: UseFormRegister<any>;
  registerWithMask?: any;
  label?: string;
  required?: boolean;
  error?: string;
  ref?: React.Ref<React.ElementRef<"input">>;
};
