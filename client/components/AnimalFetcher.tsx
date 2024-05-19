import { Animal } from '@prisma-app/client';
import { fetchAnimal, FetchError } from 'api/api';
import { useEffect, useState } from 'react';
import { ErrorWrapper, ERROR_ANIMAL_NOT_FOUND, ERROR_GENERIC } from 'errors';

export function AnimalFetcher({
  id,
  ssrAnimal,
  Component,
}: {
  id: string;
  ssrAnimal: Animal;
  Component: React.FunctionComponent<{ animal: Animal }>;
}) {
  const [animal, setAnimal] = useState<Animal>(ssrAnimal);
  const [error, setError] = useState<FetchError>(null);

  useEffect(() => {
    const loadAnimal = async () => {
      const { data, error } = await fetchAnimal(id);
      setAnimal(data);
      setError(error);
    };

    if (!ssrAnimal) {
      loadAnimal();
    }
  }, [id, ssrAnimal]);

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
