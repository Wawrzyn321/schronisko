import { Animal } from '@prisma-app/client';
import { ErrorWrapper, ERROR_ANIMAL_NOT_FOUND, ERROR_GENERIC } from 'errors';
import { useLoadAnimal } from './useLoadAnimal';

export function AnimalFetchContainer({
  id,
  ssrAnimal,
  Component,
}: {
  id: string;
  ssrAnimal: Animal;
  Component: React.FunctionComponent<{ animal: Animal }>;
}) {
  const {error, animal} = useLoadAnimal(id, ssrAnimal);

  return (
    <ErrorWrapper
      isLoaded={!!animal}
      error={error}
      errorGeneric={ERROR_GENERIC}
      error404={ERROR_ANIMAL_NOT_FOUND}
    >
      <Component animal={animal} />
    </ErrorWrapper>
  );
}
