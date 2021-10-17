import Image from 'next/image';
import styles from './AnimalList.module.scss';
import { Animal, AnimalCategory } from '.prisma/client';
import { IMAGES_URL, OVERLAYS_URL } from 'api';
import { useEffect, useState } from 'react';
import { BACKEND_URL, throwingFetch } from 'api';

function Overlay({ category }: { category: AnimalCategory }) {
  const Img = ({ name }: { name: string }) => (
    <img src={OVERLAYS_URL + '/' + name} alt="" className={styles['overlay']} />
  );

  if (category === AnimalCategory.Weterani) {
    return <Img name="najdluzej czekam.svg" />;
  } else if (category === AnimalCategory.PilniePotrzebuja) {
    return <Img name="pilnie szukam domu.svg" />;
  } else {
    return null;
  }
}

function AnimalCard({
  animal,
  showOverlay = false,
}: {
  animal: Animal;
  showOverlay: boolean;
}) {
  return (
    <li className={styles['animal-card']}>
      <Image
        src={IMAGES_URL + '/' + animal.imageName}
        alt={animal.name}
        width="340px"
        height="340px"
      />
      {showOverlay && <Overlay category={animal.category} />}
      <div className={styles['animal-ids']}>
        <span className={styles['animal-name']}>{animal.name}</span>
        <span>{animal.refNo}</span>
      </div>
      <dl className={styles['animal-data']}>
        <dt>Miejsce pobytu:</dt>
        <dd>{animal.location}</dd>
        <dt>Opiekun wirtualny:</dt>
        <dd>{animal.virtualCaretakerName || 'Brak'}</dd>
      </dl>
    </li>
  );
}

export function AnimalList({
  bw = false,
  category = null,
  filter = () => true,
  showOverlay = false,
}: {
  category?: AnimalCategory;
  bw?: boolean;
  filter: (animal: Animal) => boolean;
  showOverlay?: boolean;
}) {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const loadPage = async () => setAnimals(await fetchAnimals(category));

    loadPage();
  }, []);

  const className = `${styles['animals-list']} ${bw ? styles['bw'] : ''}`;

  return (
    <ul className={className}>
      {animals.filter(filter).map((animal) => (
        <AnimalCard animal={animal} key={animal.id} showOverlay={showOverlay} />
      ))}
    </ul>
  );
}

async function fetchAnimals(category: string) {
  const url = BACKEND_URL + '/api/animals?category=' + category;
  try {
    return await throwingFetch(url);
  } catch (e) {
    console.warn('error', e);
    // todo
    return [];
  }
}
