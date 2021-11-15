import React, { useEffect, useState } from 'react';

import { Animal } from '.prisma/client';
import { fetchAnimal, FetchError } from 'api';
import { ERROR_ANIMAL_NOT_FOUND, ERROR_GENERIC } from 'errors';

import { Article } from 'components/Article/Article';
import { AnimalImages } from './AnimalImages/AnimalImages';
import { AnimalBreadcrumbs } from './AnimalBreadcrumbs';
import { AnimalMetadata } from './AnimalMetadata/AnimalMetadata';
import { AnimalHeader } from './AnimalHeader/AnimalHeader';

interface AnimalDetailsProps {
  id: string;
  ssrAnimal: Animal;
}

export function AnimalDetails({ id, ssrAnimal }: AnimalDetailsProps) {
  const [animal, setAnimal] = useState<Animal>(ssrAnimal);
  const [error, setError] = useState<FetchError>(null);

  useEffect(() => {
    const loadAnimal = async () => {
      const { data, error } = await fetchAnimal(id, false);
      setAnimal(data);
      setError(error);
    };

    loadAnimal();
  }, []);

  if (animal) {
    return (
      <>
        <AnimalBreadcrumbs animal={animal} />
        <AnimalHeader animal={animal} />
        <AnimalMetadata animal={animal} />
        <AnimalImages id={id} />
      </>
    );
  } else if (error) {
    if (error.statusCode === 404) {
      return <Article {...ERROR_ANIMAL_NOT_FOUND} />;
    } else {
      return <Article {...ERROR_GENERIC} />;
    }
  } else {
    return <p>Ładowanie...</p>;
  }
}
