import Link from 'next/link';
import styles from './AfterAdoptionAnimals.module.scss';
import { AfterAdoptionAnimal } from 'types';
import { buildAnimalImageUrl, buildAnimalUrl } from 'api/config';
import { Animal } from '.prisma/client';
import not_found_placeholder from 'public/site/main/404_placeholder.png';
import Image from 'next/image';

function AnimalImage({ animal }: { animal: AfterAdoptionAnimal }) {
  return (
    <div>
      <div className={styles['animal-image']}>
        <img src={buildAnimalImageUrl(animal)} alt={animal.imageName} />
        <div className={styles['animal-image__link']}>
          <Link href={buildAnimalUrl(animal.id)}>Dowiedz się więcej</Link>
        </div>
      </div>
    </div>
  );
}

export function AfterAdoptionAnimals({
  afterAdoptionAnimals,
}: {
  afterAdoptionAnimals: AfterAdoptionAnimal[];
}) {
  if (!afterAdoptionAnimals) return null;
  const placeholders = new Array(3 - afterAdoptionAnimals.length).fill(null);

  return (
    <div className={styles['after-adoption-animals__pics']}>
      {afterAdoptionAnimals.map((animal: Animal) => (
        <AnimalImage key={animal.id} animal={animal} />
      ))}
      {placeholders.map((_: null, id) => (
        <Image
          src={not_found_placeholder}
          alt="nie znaleziono obrazka"
          key={id}
        />
      ))}
    </div>
  );
}
