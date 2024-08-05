import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { ButtonSmall } from "~/components/Buttons";
import { ERegistrationsStatus } from "~/types/registrations.types";

import * as S from "./styles";
import { IRegistrationCardProps } from "./types";

const RegistrationCard = ({ data }: IRegistrationCardProps) => {
  const { employeeName, email, admissionDate } = data;

  return (
    <S.Card data-testid={`card-${data.status}-status`}>
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
            <ButtonSmall bgcolor="rgb(255, 145, 154)">Reprovar</ButtonSmall>
            <ButtonSmall bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
          </>
        ) : (
          <ButtonSmall bgcolor="#ff8858">Revisar novamente</ButtonSmall>
        )}
        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
