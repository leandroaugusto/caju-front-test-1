import { UseFormRegister } from "react-hook-form"

import { TFieldValues } from "~/types/registrations.types"

export interface IFormProps {
  errors: any;
  registerWithMask: any;
  onSubmit: (data: TFieldValues) => void;
  register: UseFormRegister<TFieldValues>;
}
