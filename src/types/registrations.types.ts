export type TRegistrationsData = {
  email: string,
  admissionDate: string,
  employeeName: string,
  status?: string,
  cpf?: string,
  id?: string
}

export enum ERegistrationsStatus {
  REVIEW = "REVIEW",
  APPROVED = "APPROVED",
  REPROVED = "REPROVED",
}
