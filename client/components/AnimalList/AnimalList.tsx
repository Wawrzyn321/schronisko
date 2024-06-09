import styles from './AnimalList.module.scss';
import {
  Animal,
  AnimalCategory,
  AnimalType,
  VirtualCaretakerType,
} from '@prisma-app/client';
import { useEffect, useState } from 'react';
import { AnimalCategoryLegend } from './AnimalCategoryLegend/AnimalCategoryLegend';
import { AnimalCard } from './AnimalCard/AnimalCard';
import { Pagination } from './Pagination/Pagination';
import { fetchAnimals, FetchError } from 'api/api';
import { Article } from 'components/Article/Article';
import { ERROR_ANIMAL_LIST } from 'errors';
import { AnimalModal, AnimalModalData } from './AnimalModal/AnimalModal';
import { useSearchParams } from 'next/navigation';

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

const PAGE_SIZE = 27;

export function AnimalList({
  categories = [],
  vCaretakerType = null,
  type = null,
  withCategoryOverlay = false,
}: AnimalListProps) {
  const searchParams = useSearchParams()
  const targetPage = parseInt(searchParams.get('page') ?? '1') - 1;

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [error, setError] = useState<FetchError>(null);
  const [currentPage, setCurrentPage] = useState(targetPage);
  const [modalData, setModalData] = useState<AnimalModalData>({
    isOpen: false,
    animal: null,
  });

  const pagesCount = Math.ceil(totalCount / PAGE_SIZE);

  const setPage = (pageNumber: number) => {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname + '?page=' + (pageNumber + 1),
    );
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    const loadAnimals = async () => {
      const { data, error } = await fetchAnimals({
        categories,
        vCaretakerType,
        type,
        skip: currentPage * PAGE_SIZE,
        take: PAGE_SIZE,
      });
      if (error) {
        setError(error);
        setAnimals(null);
      } else {
        const { animals, totalCount } = data;
        setAnimals(animals);
        setTotalCount(totalCount);
      }
    };

    loadAnimals();
  }, [currentPage, categories, type, vCaretakerType]);

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
  } else if (error) {
    return <Article {...ERROR_ANIMAL_LIST} />;
  } else {
    return <p>Ładowanie...</p>;
  }
}

function getPageFromQueryString(totalCount: number) {
  if (typeof window !== 'undefined') {
    const pageNoFromQueryString = ((parseInt(new URL(window.location.href).searchParams.get('page'))) || 1) - 1;

    return clamp({
      min: 0,
      max: totalCount - 1,
      value: pageNoFromQueryString
    })
  }
  return 1;
}

function clamp({
  min, max, value
}: { min: number, max: number, value: number }) {
  return Math.max(Math.min(value, max), min);
}