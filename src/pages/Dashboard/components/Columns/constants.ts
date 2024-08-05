import { ERegistrationsStatus } from "~/types/registrations.types";

export const allColumns = [
  { status: ERegistrationsStatus.REVIEW, title: "Pronto para revisar" },
  { status: ERegistrationsStatus.APPROVED, title: "Aprovado" },
  { status: ERegistrationsStatus.REPROVED, title: "Reprovado" },
];
