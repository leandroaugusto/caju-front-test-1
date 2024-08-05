import { toLower } from "~/utils/toLower";

import RegistrationCard from "../RegistrationCard";

import * as S from "./styles";
import { IColumnsProps } from "./types";
import { allColumns } from "./constants";

export const Columns = ({ registrations }: IColumnsProps) => {
  return (
    <S.Container data-testid="columns-container">
      {allColumns.map((column) => {
        return (
          <S.Column $status={toLower(column.status)} key={column.title}>
            <>
              <S.TitleColumn $status={toLower(column.status)}>
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
