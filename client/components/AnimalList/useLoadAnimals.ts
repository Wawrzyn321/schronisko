import { fetchAnimals, FetchError } from "api/api";
import { useEffect, useState } from "react";
import {
  Animal,
  AnimalCategory,
  AnimalType,
  VirtualCaretakerType,
} from "@prisma-app/client";

export const PAGE_SIZE = 27;

type Args = {
  categories?: AnimalCategory[];
  vCaretakerType?: VirtualCaretakerType;
  type?: AnimalType;
  currentPage: number;
};

export function useLoadAnimals({
  categories,
  vCaretakerType,
  currentPage,
  type,
}: Args) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<FetchError>(null);

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

  return { error, totalCount, animals };
}
