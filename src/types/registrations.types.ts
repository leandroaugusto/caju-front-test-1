export type TRegistrationsData = {
  id: string,
  cpf: string,
  email: string,
  employeeName: string,
  admissionDate: string,
  status: ERegistrationsStatus,
  active?: boolean,
}

export type TFieldValues = Omit<TRegistrationsData, "id" | "status">

export enum ERegistrationsStatus {
  REVIEW = "REVIEW",
  APPROVED = "APPROVED",
  REPROVED = "REPROVED",
}
