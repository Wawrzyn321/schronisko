import styles from './AnimalList.module.scss';
import {
  Animal,
  AnimalCategory,
  AnimalType,
  VirtualCaretakerType,
} from '@prisma-app/client';
import { useState } from 'react';
import { AnimalCategoryLegend } from './AnimalCategoryLegend/AnimalCategoryLegend';
import { AnimalCard } from './AnimalCard/AnimalCard';
import { Pagination } from './Pagination/Pagination';
import { Article } from 'components/Article/Article';
import { ERROR_ANIMAL_LIST } from 'errors';
import { AnimalModal, AnimalModalData } from './AnimalModal/AnimalModal';
import { useSearchParams } from 'next/navigation';
import { PAGE_SIZE, useLoadAnimals } from './useLoadAnimals';

function NotFoundMessage() {
  return (
    <em className={styles['not-found-message']}>
      Nie znaleziono pasujących zwierząt.
    </em>
  );
}

type AnimalListProps = {
  categories?: AnimalCategory[];
  vCaretakerType?: VirtualCaretakerType;
  type?: AnimalType;
  withCategoryOverlay?: boolean;
};

export function AnimalList({
  categories = [],
  vCaretakerType = null,
  type = null,
  withCategoryOverlay = false,
}: AnimalListProps) {
  const searchParams = useSearchParams()
  const targetPage = parseInt(searchParams.get('page') ?? '1') - 1;

  const [currentPage, setCurrentPage] = useState(targetPage);
  const [modalData, setModalData] = useState<AnimalModalData>({
    isOpen: false,
    animal: null,
  });

  const setPage = (pageNumber: number) => {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname + '?page=' + (pageNumber + 1),
    );
    setCurrentPage(pageNumber)
  }

  const { animals, totalCount, error } = useLoadAnimals({
    categories, vCaretakerType, currentPage, type
  });

  const pagesCount = Math.ceil(totalCount / PAGE_SIZE);

  if (error) {
    return <Article {...ERROR_ANIMAL_LIST} />;
  }

  if (animals.length) {
    return <p>Ładowanie...</p>;
  }

  return (
    <>
      {withCategoryOverlay && <AnimalCategoryLegend />}
      {animals.length ? (
        <>
          <ul className={styles['animals-list']}>
            {animals.map((animal: Animal) => (
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
            ))}
          </ul>
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            setCurrentPage={setPage}
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
}
