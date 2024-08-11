import type { TRegistrationsData } from "~/types/registrations.types";

export interface ICardContainerProps {
  data: TRegistrationsData
}

export type TActionType = "approve" | "reprove" | "review" | "delete";
