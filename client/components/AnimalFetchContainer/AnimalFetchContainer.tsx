import { Animal } from "@prisma-app/client";
import { useQuery } from "@tanstack/react-query";
import { animalDetailsQueryOptions } from "api/queryOptions";
import { ErrorWrapper, ERROR_ANIMAL_NOT_FOUND, ERROR_GENERIC } from "errors";

type Props = {
  id: string;
  Component: React.FunctionComponent<{ animal: Animal }>;
};

export function AnimalFetchContainer({ id, Component }: Props) {
  const { data: animal, error } = useQuery(animalDetailsQueryOptions(id));

  return (
    <ErrorWrapper
      isLoaded={!!animal}
      error={error}
      errorGeneric={ERROR_GENERIC}
      error404={ERROR_ANIMAL_NOT_FOUND}
    >
      {animal && <Component animal={animal} />}
    </ErrorWrapper>
  );
}
