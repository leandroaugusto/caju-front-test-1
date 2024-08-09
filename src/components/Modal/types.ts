export interface IModalProps {
  open: boolean
  onClose: () => void
  message: string
  confirm: () => void
}
