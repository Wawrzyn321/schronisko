import styles from "./AnimalList.module.scss";
import {
  Animal,
  AnimalCategory,
  AnimalType,
  VirtualCaretakerType,
} from "@prisma-app/client";
import { useState } from "react";
import { AnimalCategoryLegend } from "./AnimalCategoryLegend/AnimalCategoryLegend";
import { AnimalCard } from "./AnimalCard/AnimalCard";
import { Pagination } from "./Pagination/Pagination";
import { Article } from "components/Article/Article";
import { ERROR_ANIMAL_LIST } from "errors";
import { AnimalModal } from "./AnimalModal/AnimalModal";
import { useQuery } from "@tanstack/react-query";
import { animalsQueryOptions } from "api/queryOptions";
import { PAGE_SIZE } from "api/getServerSideProps";

function NotFoundMessage() {
  return (
    <em className={styles["not-found-message"]}>
      Nie znaleziono pasujących zwierząt.
    </em>
  );
}

type AnimalListProps = {
  categories?: AnimalCategory[];
  vCaretakerType?: VirtualCaretakerType | null;
  type?: AnimalType | null;
  withCategoryOverlay?: boolean;
  initialPage: number;
};

export function AnimalList({
  categories = [],
  vCaretakerType,
  type,
  withCategoryOverlay = false,
  initialPage,
}: AnimalListProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const setPage = (pageNumber: number) => {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname + "?page=" + (pageNumber + 1),
    );
    setCurrentPage(pageNumber);
  };

  const { data, error, isPlaceholderData } = useQuery(
    animalsQueryOptions({
      categories,
      vCaretakerType,
      type,
      skip: currentPage * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  );

  const { animals, totalCount } = data ?? { animals: [], totalCount: 0 };

  const pagesCount = Math.ceil(totalCount / PAGE_SIZE);

  if (error) {
    return <Article {...ERROR_ANIMAL_LIST} />;
  }

  const listClasses = isPlaceholderData
    ? `${styles["animals-list"]} ${styles["animals-list--loading"]}`
    : styles["animals-list"];

  return (
    <>
      {withCategoryOverlay && <AnimalCategoryLegend />}
      {animals.length ? (
        <>
          <ul className={listClasses}>
            {animals.map((animal: Animal) => (
              <AnimalCard
                animal={animal}
                key={animal.id}
                showOverlay={withCategoryOverlay}
                openModal={setSelectedAnimal}
                interactive={!isPlaceholderData}
              />
            ))}
          </ul>
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            setCurrentPage={setPage}
          />
          <AnimalModal
            isOpen={!!selectedAnimal}
            animal={selectedAnimal}
            close={() => setSelectedAnimal(null)}
          />
        </>
      ) : (
        <NotFoundMessage />
      )}
    </>
  );
}
