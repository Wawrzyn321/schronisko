import styles from './AnimalList.module.scss';
import { Animal, AnimalCategory, AnimalType } from '.prisma/client';
import { useEffect, useState } from 'react';
import { AnimalCategoryLegend } from './AnimalCategoryLegend/AnimalCategoryLegend';
import { AnimalCard } from './AnimalCard/AnimalCard';
import { fetchAnimals } from './fetchAnimals';
import { paginate, Pagination } from './Pagination/Pagination';

function NotFoundMessage() {
  return (
    <em className={styles['not-found-message']}>
      Nie znaleziono pasujących zwierząt.
    </em>
  );
}

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
  const pageSize = 9;
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filterCategory, setFilterCategory] = useState<
    AnimalCategory | undefined
  >();
  const [currentPage, setCurrentPage] = useState(0);

  const filterWithCategory = (animal: Animal) => {
    if (!filterCategory) return true;
    return animal.category === filterCategory;
  };
  const filteredAnimals = animals.filter(
    (a) => filter(a) && filterWithCategory(a),
  );
  const pagesCount = Math.ceil(filteredAnimals.length / pageSize);

  useEffect(() => {
    if (currentPage > pagesCount) {
      setCurrentPage(0);
    }
  }, [currentPage, filteredAnimals]);

  useEffect(() => {
    const loadPage = async () => setAnimals(await fetchAnimals(category, type));

    loadPage();
  }, []);

  const className = `${styles['animals-list']} ${bw ? styles['bw'] : ''}`;

  return (
    <>
      {withCategoryOverlay && (
        <AnimalCategoryLegend
          category={filterCategory}
          setCategory={setFilterCategory}
        />
      )}
      {filteredAnimals.length ? (
        <>
          <ul className={className}>
            {paginate(filteredAnimals, pageSize, currentPage).map((animal) => (
              <AnimalCard
                animal={animal}
                key={animal.id}
                showOverlay={withCategoryOverlay}
              />
            ))}
          </ul>
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <NotFoundMessage />
      )}
    </>
  );
}
