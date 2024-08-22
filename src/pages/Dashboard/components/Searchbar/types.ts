import { InputHTMLAttributes } from "react";

export interface ISearchBarProps {
  register: (fieldName: "cpf", mask: string) => InputHTMLAttributes<HTMLInputElement>;
}
