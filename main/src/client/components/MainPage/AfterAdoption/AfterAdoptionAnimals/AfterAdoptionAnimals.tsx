import Link from 'next/link';
import styles from './AfterAdoptionAnimals.module.scss';
import { AfterAdoptionAnimal } from 'types';
import { IMAGES_URL, MAIN_PAGE_IMAGES_URL } from 'api';

const buildAnimalUrl = (animal: AfterAdoptionAnimal) => {
  return `/animals/${animal.type.toLocaleLowerCase()}/${animal.id}`;
};

function AnimalImage({ animal }: { animal: AfterAdoptionAnimal }) {
  return (
    <div>
      <div className={styles['animal-image']}>
        <img src={IMAGES_URL + '/' + animal.imageName} alt={animal.imageName} />
        <div className={styles['animal-image__link']}>
          <Link href={buildAnimalUrl(animal)}>Dowiedz się więcej</Link>
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
  const placeholders = new Array(3 - afterAdoptionAnimals.length).fill(null);

  return (
    <div className={styles['after-adoption-animals__pics']}>
      {afterAdoptionAnimals.map((animal) => (
        <AnimalImage key={animal.id} animal={animal} />
      ))}
      {placeholders.map((_, id) => (
        <img
          key={id}
          src={MAIN_PAGE_IMAGES_URL + '/404_placeholder.png'}
          alt="404?"
        />
      ))}
    </div>
  );
}
