import * as S from "./styles";

export const Loading = () => {
  return (
    <S.Container
      role="status"
      aria-live="polite"
      data-testid="loading-container"
    >
      <S.Spinner />
    </S.Container>
  );
};
