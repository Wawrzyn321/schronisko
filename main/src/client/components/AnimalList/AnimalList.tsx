import styles from './AnimalList.module.scss';
import { Animal, AnimalCategory, AnimalType } from '.prisma/client';
import { useEffect, useState } from 'react';
import { AnimalCategoryLegend } from './AnimalCategoryLegend/AnimalCategoryLegend';
import { AnimalCard } from './AnimalCard/AnimalCard';
import { paginate, Pagination } from './Pagination/Pagination';
import { fetchAnimals, FetchError } from 'api';
import { Article } from 'components/Article/Article';
import { ERROR_ANIMAL_LIST } from 'errors';
import { AnimalModal, AnimalModalData } from './AnimalModal/AnimalModal';

function NotFoundMessage() {
  return (
    <em className={styles['not-found-message']}>
      Nie znaleziono pasujących zwierząt.
    </em>
  );
}

interface AnimalListProps {
  category?: AnimalCategory;
  type?: AnimalType;
  filter?: (animal: Animal) => boolean;
  withCategoryOverlay?: boolean;
}

export function AnimalList({
  category = null,
  type = null,
  filter = () => true,
  withCategoryOverlay = false,
}: AnimalListProps) {
  const pageSize = 27;
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [error, setError] = useState<FetchError>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterCategory, setFilterCategory] = useState<AnimalCategory>();
  const [modalData, setModalData] = useState<AnimalModalData>({
    isOpen: false,
    animal: null,
  });

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
    const loadAnimals = async () => {
      const { data, error } = await fetchAnimals(
        category,
        type,
        currentPage * pageSize,
        pageSize,
      );
      setAnimals(data);
      setError(error);
    };

    loadAnimals();
  }, []);

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
            <ul className={styles['animals-list']}>
              {paginate(filteredAnimals, pageSize, currentPage).map(
                (animal: Animal) => (
                  <AnimalCard
                    animal={animal}
                    key={animal.id}
                    showOverlay={withCategoryOverlay}
                    openModal={(animal: Animal) => {
                      setModalData({
                        isOpen: true,
                        animal,
                      });
                    }}
                  />
                ),
              )}
            </ul>
            <Pagination
              pagesCount={pagesCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            <AnimalModal
              isOpen={modalData.isOpen}
              animal={modalData.animal}
              close={() => setModalData({ animal: null, isOpen: false })}
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
