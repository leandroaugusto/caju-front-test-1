import * as S from "./styles";

export const EmptyCard = () => {
  return (
    <S.Card data-testid="empty-card-container">
      <h3 data-testid="employee-name">
        Não foram encontrados registros para essa busca
      </h3>
    </S.Card>
  );
};
