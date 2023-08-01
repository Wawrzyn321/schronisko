import styles from './AnimalList.module.scss';
import {
  Animal,
  AnimalCategory,
  AnimalType,
  VirtualCaretakerType,
} from '.prisma/client';
import { useEffect, useState } from 'react';
import { AnimalCategoryLegend } from './AnimalCategoryLegend/AnimalCategoryLegend';
import { AnimalCard } from './AnimalCard/AnimalCard';
import { Pagination } from './Pagination/Pagination';
import { fetchAnimals, FetchError } from 'api/api';
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
  const pageSize = 27;
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [error, setError] = useState<FetchError>(null);
  const [currentPage, setCurrentPage] = useState(
    getPageFromQueryString(Number.MAX_VALUE),
  );
  const [modalData, setModalData] = useState<AnimalModalData>({
    isOpen: false,
    animal: null,
  });

  const pagesCount = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    const firstLoadHappened = !!totalCount;
    if (firstLoadHappened && currentPage > pagesCount) {
      setCurrentPage(0);
    }
  }, [currentPage, animals, totalCount, pagesCount]);

  useEffect(() => {
    const loadAnimals = async () => {
      const { data, error } = await fetchAnimals({
        categories,
        vCaretakerType,
        type,
        skip: currentPage * pageSize,
        take: pageSize,
      });
      if (error) {
        setError(error);
        setAnimals(null);
      } else {
        const { animals, totalCount } = data;
        setAnimals(animals);
        setTotalCount(totalCount);

        const pageFromQueryString = getPageFromQueryString(totalCount);
        setCurrentPage(pageFromQueryString);
      }
    };

    loadAnimals();
  }, [currentPage, categories, type, vCaretakerType]);

  useEffect(() => {
    const firstLoadHappened = !!totalCount;
    if (firstLoadHappened) {
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname + '?page=' + (currentPage + 1),
      );
    }
  }, [currentPage, totalCount]);

  if (animals) {
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
function getPageFromQueryString(totalCount: number) {
  if (typeof window !== 'undefined') {
    const l = window.location as unknown;
    let pageFromQueryString =
      (parseInt(new URL(l as string).searchParams.get('page')) || 1) - 1;

    pageFromQueryString = Math.max(
      Math.min(pageFromQueryString, totalCount - 1),
      0,
    );

    return pageFromQueryString;
  }
  return 0;
}
