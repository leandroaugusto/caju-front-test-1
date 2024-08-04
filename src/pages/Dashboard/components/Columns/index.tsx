import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { allColumns } from "./constants";
import { IColumnsProps } from "./types";

export const Columns = ({ registrations }: IColumnsProps) => {
  return (
    <S.Container data-testid="columns-container">
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrations?.map((registration) => {
                  return (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
                    />
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
