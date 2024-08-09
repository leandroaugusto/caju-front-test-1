export type TRegistrationsData = {
  email: string,
  admissionDate: string,
  employeeName: string,
  cpf: string,
  id?: string,
  status?: string
}

export type TFieldValues = Omit<TRegistrationsData, "id" | "status">

export enum ERegistrationsStatus {
  REVIEW = "REVIEW",
  APPROVED = "APPROVED",
  REPROVED = "REPROVED",
}
