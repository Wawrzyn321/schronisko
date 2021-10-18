import styles from './AnimalList.module.scss';
import { Animal, AnimalCategory, AnimalType } from '.prisma/client';
import { useEffect, useState } from 'react';
import { BACKEND_URL, throwingFetch } from 'api';
import { AnimalCategoryLegend } from './AnimalCategoryLegend/AnimalCategoryLegend';
import { AnimalCard } from './AnimalCard/AnimalCard';

export function AnimalList({
  bw = false,
  category = null,
  type = null,
  filter = () => true,
  withCategoryOverlay = false,
}: {
  category?: AnimalCategory;
  type?: AnimalType;
  bw?: boolean;
  filter?: (animal: Animal) => boolean;
  withCategoryOverlay?: boolean;
}) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filterCategory, setFilterCategory] = useState<
    AnimalCategory | undefined
  >();

  useEffect(() => {
    const loadPage = async () => setAnimals(await fetchAnimals(category, type));

    loadPage();
  }, []);
  
  const filterWithCategory = (animal: Animal) => {
    if (!filterCategory) return true;
    return animal.category === filterCategory;
  };

  const className = `${styles['animals-list']} ${bw ? styles['bw'] : ''}`;

  return (
    <>
      {withCategoryOverlay && (
        <AnimalCategoryLegend
          category={filterCategory}
          setCategory={setFilterCategory}
        />
      )}
      <ul className={className}>
        {animals
          .filter((a) => filter(a) && filterWithCategory(a))
          .map((animal) => (
            <AnimalCard
              animal={animal}
              key={animal.id}
              showOverlay={withCategoryOverlay}
            />
          ))}
      </ul>
    </>
  );
}

async function fetchAnimals(category: AnimalCategory, type: AnimalType) {
  const url = `${BACKEND_URL}/api/animals?category=${category}&type=${type}`;
  try {
    return await throwingFetch(url);
  } catch (e) {
    console.warn('error', e);
    // todo
    return [];
  }
}
