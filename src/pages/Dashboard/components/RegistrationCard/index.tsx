import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { ButtonSmall } from "~/components/Buttons";
import { ERegistrationsStatus } from "~/types/registrations.types";
import { toLower } from "~/utils/toLower";

import * as S from "./styles";
import { IRegistrationCardProps } from "./types";

export const RegistrationCard = ({ data }: IRegistrationCardProps) => {
  const { employeeName, email, admissionDate } = data;

  return (
    <S.Card data-testid={`card-${toLower(data.status as string)}-status`}>
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
            <ButtonSmall data-testid="reproved-button" $buttonTheme="reproved">
              Reprovar
            </ButtonSmall>
            <ButtonSmall data-testid="approved-button" $buttonTheme="approved">
              Aprovar
            </ButtonSmall>
          </>
        ) : (
          <ButtonSmall data-testid="review-button" $buttonTheme="review">
            Revisar novamente
          </ButtonSmall>
        )}
        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  );
};
