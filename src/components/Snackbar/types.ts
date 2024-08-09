export interface ISnackbarProps {
  autoHideDuration?: number;
  message: string;
  onClose: () => void;
  open: boolean;
}
