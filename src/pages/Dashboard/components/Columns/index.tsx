import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { allColumns } from "./constants";
import { IColumnsProps } from "./types";

export const Columns = ({ registrations }: IColumnsProps) => {
  return (
    <S.Container data-testid="columns-container">
      {allColumns.map((column) => {
        return (
          <S.Column status={column.status} key={column.title}>
            <>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrations?.map(
                  (registration) =>
                    registration.status === column.status && (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                      />
                    )
                )}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
