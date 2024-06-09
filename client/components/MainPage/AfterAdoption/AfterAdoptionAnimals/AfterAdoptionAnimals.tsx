import Link from 'next/link';
import styles from './AfterAdoptionAnimals.module.scss';
import { AfterAdoptionAnimal } from 'types';
import {
  buildAnimalImageUrl,
  buildAnimalUrl,
} from 'api/config';
import { Animal } from '@prisma-app/client';
import Image from 'next/image';
import placeholderImage from 'public/site/main/404_placeholder.png';

function AnimalImage({ animal }: { animal: AfterAdoptionAnimal }) {
  const imageSrc = buildAnimalImageUrl(animal);
  const animalUrl = buildAnimalUrl(animal.id);
  const linkText = `${animal.type === 'CAT' ? "Kot" : "Pies"} ${animal.name}`;

  return (
    <div className={styles['animal-image']}>
      <img src={imageSrc} alt={animal.imageName} />

      <div className={styles['animal-image__link']}>
        <Link href={animalUrl}>{linkText}</Link>
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
      {placeholders.map((_: null, index) => (
        <Image
          key={index}
          src={placeholderImage}
          alt="404?"
        />
      ))}
    </div>
  );
}
