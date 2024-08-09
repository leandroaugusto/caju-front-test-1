import { useCallback, useEffect, useState, useRef } from "react";

import { ButtonSmall } from "~/components/Buttons";

import { ISnackbarProps } from "./types";
import * as S from "./styles";

export const SnackBar = ({
  open,
  message,
  onClose,
  autoHideDuration = 5000,
}: ISnackbarProps) => {
  const [visible, setVisible] = useState<boolean>(open);

  const timerToHide = useRef<NodeJS.Timeout | number>(0);

  const startAutoHide = useCallback(() => {
    timerToHide.current = setTimeout(() => onClose(), autoHideDuration);
  }, [autoHideDuration, onClose]);

  const handleClearTimeout = () => clearTimeout(timerToHide.current);

  const handleClose = () => {
    onClose();
    handleClearTimeout();
  };

  useEffect(() => setVisible(open), [open, setVisible]);

  useEffect(() => {
    startAutoHide();
    return () => handleClearTimeout();
  }, [startAutoHide]);

  return (
    <S.Container $visible={visible} aria-hidden={!visible}>
      <S.Text>{message}</S.Text>
      <ButtonSmall $buttonTheme="approved" onClick={handleClose}>
        OK
      </ButtonSmall>
    </S.Container>
  );
};
