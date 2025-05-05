import { fetchAnimal, FetchError } from "api/api";
import { useEffect, useState } from "react";
import { Animal } from "@prisma-app/client";

export function useLoadAnimal(id: string, ssrAnimal: Animal) {
  const [animal, setAnimal] = useState<Animal>(ssrAnimal);
  const [error, setError] = useState<FetchError>(null);

  useEffect(() => {
    const loadAnimal = async () => {
      const { data, error } = await fetchAnimal(id);
      setAnimal(data);
      setError(error);
    };

    if (!ssrAnimal) {
      loadAnimal();
    }
  }, [id, ssrAnimal]);

  return { error, animal };
}
