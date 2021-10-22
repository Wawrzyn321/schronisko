import Image from 'next/image';
import { Animal } from '.prisma/client';
import { fetchAnimal, FetchError } from 'api';
import styles from './AnimalDetails.module.scss';
import { useEffect, useState } from 'react';
import { AnimalImages } from './AnimalImages';
import { ERROR_ANIMAL_NOT_FOUND, ERROR_GENERIC } from 'errors';
import { Article } from 'components/Article/Article';
import opiekun from 'public/site/animal-details/opiekun.svg';
import kontakt from 'public/site/animal-details/kontakt.svg';

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

  const MiniIcon = ({ name, icon }: { icon: any; name: string }) => (
    <Image src={icon} alt={name} width="30px" height="30px" />
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
              <MiniIcon name="opiekun" icon={opiekun} />
              Opiekun wirtualny:
            </dt>
            <dd>{animal.virtualCaretakerName || 'brak'}</dd>
          </div>
          <div>
            <dt>
              <MiniIcon name="kontakt" icon={kontakt} />
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
