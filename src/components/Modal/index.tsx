import { useEffect, useRef } from "react";

import { ButtonSmall } from "~/components/Buttons";

import { IModalProps } from "./types";
import * as S from "./styles";

export const Modal = ({ open, onClose, message, confirm }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  return (
    <div
      ref={modalRef}
      role="dialog"
      tabIndex={-1}
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-hidden={!open}
      data-testid="modal-container"
    >
      <S.Backdrop data-testid="modal-backdrop" $open={open} />

      <S.Content data-testid="modal-content" $open={open}>
        <S.Title id="modal-title">{message}</S.Title>

        <S.Actions>
          <ButtonSmall
            $buttonTheme="reproved"
            aria-label="cancel"
            onClick={onClose}
          >
            Cancelar
          </ButtonSmall>
          <ButtonSmall
            $buttonTheme="approved"
            aria-label="confirm"
            onClick={confirm}
          >
            Confirmar
          </ButtonSmall>
        </S.Actions>
      </S.Content>
    </div>
  );
};
