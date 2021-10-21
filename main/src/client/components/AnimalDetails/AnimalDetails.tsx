import Image from 'next/image';
import { Animal } from '.prisma/client';
import { ANIMAL_DETAILS_URL, fetchAnimal, FetchError } from 'api';
import styles from './AnimalDetails.module.scss';
import { useEffect, useState } from 'react';
import { AnimalImages } from './AnimalImages';
import { ERROR_ANIMAL_NOT_FOUND, ERROR_GENERIC } from 'errors';
import { Article } from 'components/Article/Article';

export function AnimalDetails({
  id,
  ssrAnimal,
}: {
  id: string;
  ssrAnimal: Animal;
}) {
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

  const MiniIcon = ({ name }: { name: string }) => (
    <Image
      src={ANIMAL_DETAILS_URL + '/' + name + '.svg'}
      alt={name}
      width="30px"
      height="30px"
    />
  );

  if (animal) {
    return (
      <div>
        <h1>{animal.name}</h1>
        <div className={styles['animal-details--description']}>
          {animal.description.split('\n').map((str, i) => (
            <p key={i}>{str}</p>
          ))}
        </div>

        <dl className={styles['animal-metadata']}>
          <div>
            <dt>
              <MiniIcon name="opiekun" />
              Opiekun wirtualny:
            </dt>
            <dd>{animal.virtualCaretakerName || 'brak'}</dd>
          </div>
          <div>
            <dt>
              <MiniIcon name="kontakt" />
              Kontakt:
            </dt>
            <dd>{animal.contactInfo}</dd>
          </div>
        </dl>

        <AnimalImages id={id} />
      </div>
    );
  } else if (error) {
    if (error.statusCode === 404) {
      <Article {...ERROR_ANIMAL_NOT_FOUND} />;
    } else {
      <Article {...ERROR_GENERIC} />;
    }
  } else {
    return <p>Ładowanie...</p>;
  }
}
