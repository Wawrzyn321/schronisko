import Image from 'next/image';
import { Animal, AnimalImage } from '.prisma/client';
import {
  ANIMAL_DETAILS_URL,
  BACKEND_URL,
  IMAGES_URL,
  SSR_BACKEND_URL,
  throwingFetch,
} from 'api';
import styles from './AnimalDetails.module.scss';
import { useEffect, useState } from 'react';

export async function fetchAnimal(id: string, isSSR = true): Promise<Animal> {
  try {
    return await throwingFetch(
      (isSSR ? SSR_BACKEND_URL : BACKEND_URL) + '/api/c/animals/' + id,
    );
  } catch (e) {
    console.warn('error', e);
    //todo
    return null;
  }
}

async function fetchAnimalImages(id: string): Promise<AnimalImage[]> {
  try {
    return await throwingFetch(BACKEND_URL + '/api/c/animal-images/' + id);
  } catch (e) {
    console.warn('error', e);
    //todo
    return null;
  }
}

export function AnimalDetails({ id, ssrAnimal }) {
  const [animal, setAnimal] = useState<Animal>(ssrAnimal);
  const [images, setImages] = useState<AnimalImage[]>([]);

  useEffect(() => {
    const loadAnimal = async () => {
      setAnimal(await fetchAnimal(id, false));
      setImages(await fetchAnimalImages(id));
    };

    loadAnimal();
  }, []);

  if (!animal) {
    return null;
  }

  const filterVisible = (i: AnimalImage) => i.visible;

  const MiniIcon = ({ name }: { name: string }) => (
    <Image
      src={ANIMAL_DETAILS_URL + '/' + name + '.svg'}
      alt={name}
      width="30px"
      height="30px"
    />
  );

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

      <ul className={styles['animal-images']}>
        {images.filter(filterVisible).map((i) => (
          <li key={i.id}>
            <img src={IMAGES_URL + '/' + i.imageName} />
          </li>
        ))}
      </ul>
    </div>
  );
}
