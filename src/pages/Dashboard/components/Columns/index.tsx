import { toLower } from "~/utils/toLower";

import { Card } from "../../containers/Card";
import { EmptyCard } from "../../components/EmptyCard";

import { IColumnsProps } from "./types";
import { allColumns } from "./constants";

import * as S from "./styles";

export const Columns = ({ registrations }: IColumnsProps) => {
  if (!registrations?.length) return <EmptyCard />;

  return (
    <S.Container data-testid="columns-container">
      {allColumns.map((column) => {
        return (
          <S.Column $status={toLower(column.status)} key={column.title}>
            <S.TitleColumn
              data-testid="column-title"
              $status={toLower(column.status)}
            >
              {column.title}
            </S.TitleColumn>

            <S.CollumContent data-testid="column-content">
              {registrations?.map(
                (registration) =>
                  registration.status === column.status && (
                    <Card data={registration} key={registration.id} />
                  )
              )}
            </S.CollumContent>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
