import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { ButtonSmall } from "~/components/Buttons";

import { ERegistrationsStatus } from "~/types/registrations.types";
import { toLower } from "~/utils/toLower";

import { IRegistrationCardProps } from "./types";
import * as S from "./styles";

export const RegistrationCard = ({
  data,
  onCardAction,
}: IRegistrationCardProps) => {
  const { employeeName, email, admissionDate, status } = data;

  return (
    <S.Card data-testid={`card-${toLower(status)}-status`}>
      <S.IconAndText>
        <HiOutlineUser />
        <h3 data-testid="employee-name">{employeeName}</h3>
      </S.IconAndText>

      <S.IconAndText>
        <HiOutlineMail />
        <p data-testid="employee-email">{email}</p>
      </S.IconAndText>

      <S.IconAndText>
        <HiOutlineCalendar />
        <span data-testid="employee-admission-date">{admissionDate}</span>
      </S.IconAndText>

      <S.Actions>
        {data.status === ERegistrationsStatus.REVIEW ? (
          <>
            <ButtonSmall
              data-testid="reprove-button"
              $buttonTheme="reproved"
              onClick={() => onCardAction("reprove")}
            >
              Reprovar
            </ButtonSmall>

            <ButtonSmall
              data-testid="approve-button"
              $buttonTheme="approved"
              onClick={() => onCardAction("approve")}
            >
              Aprovar
            </ButtonSmall>
          </>
        ) : (
          <ButtonSmall
            data-testid="review-button"
            $buttonTheme="review"
            onClick={() => onCardAction("review")}
          >
            Revisar novamente
          </ButtonSmall>
        )}

        <HiOutlineTrash
          data-testid="delete-button"
          onClick={() => onCardAction("delete")}
        />
      </S.Actions>
    </S.Card>
  );
};
