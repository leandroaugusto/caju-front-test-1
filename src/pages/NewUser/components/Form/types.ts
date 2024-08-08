import { UseFormRegister } from "react-hook-form"

import { TFieldValues } from "~/types/registrations.types"

export interface IFormProps {
  onSubmit: (data: TFieldValues) => void;
  errors: any;
  registerWithMask: any;
  register: UseFormRegister<TFieldValues>;
}
