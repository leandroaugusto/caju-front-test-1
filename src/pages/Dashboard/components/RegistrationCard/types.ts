import { TRegistrationsData } from "~/types/registrations.types"
export interface IRegistrationCardProps {
  data: Pick<TRegistrationsData, "employeeName" | "email" | "admissionDate" | "status">;
  onCardAction: (key: 'delete' | 'review' | 'reprove' | 'approve') => void;
};
