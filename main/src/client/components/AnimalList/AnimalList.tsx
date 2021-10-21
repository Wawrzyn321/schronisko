import styles from './AnimalList.module.scss';
import { Animal, AnimalCategory, AnimalType } from '.prisma/client';
import { useEffect, useState } from 'react';
import { AnimalCategoryLegend } from './AnimalCategoryLegend/AnimalCategoryLegend';
import { AnimalCard } from './AnimalCard/AnimalCard';
import { paginate, Pagination } from './Pagination/Pagination';
import { fetchAnimals, FetchError } from 'api';
import { Article } from 'components/Article/Article';
import { ERROR_ANIMAL_LIST } from 'errors';

function NotFoundMessage() {
  return (
    <em className={styles['not-found-message']}>
      Nie znaleziono pasujących zwierząt.
    </em>
  );
}

export function AnimalList({
  bwMode = false,
  category = null,
  type = null,
  filter = () => true,
  withCategoryOverlay = false,
}: {
  category?: AnimalCategory;
  type?: AnimalType;
  bwMode?: boolean;
  filter?: (animal: Animal) => boolean;
  withCategoryOverlay?: boolean;
}) {
  const pageSize = 9;
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [error, setError] = useState<FetchError>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterCategory, setFilterCategory] = useState<AnimalCategory>();

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
    const loadPage = async () => {
      const { data, error } = await fetchAnimals(category, type);
      setAnimals(data);
      setError(error);
    };

    loadPage();
  }, []);

  const className = `${styles['animals-list']} ${bwMode ? styles['bw'] : ''}`;

  if (animals) {
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
              {paginate(filteredAnimals, pageSize, currentPage).map(
                (animal: Animal) => (
                  <AnimalCard
                    animal={animal}
                    key={animal.id}
                    showOverlay={withCategoryOverlay}
                    bwMode={bwMode}
                  />
                ),
              )}
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
  } else if (error) {
    return <Article {...ERROR_ANIMAL_LIST} />;
  } else {
    return <p>Ładowanie...</p>;
  }
}
