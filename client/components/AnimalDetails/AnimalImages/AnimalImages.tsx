import { ANIMAL_IMAGES_IMAGES_URL } from "api/config";
import styles from "./AnimalImages.module.scss";
import { Article } from "components/Article/Article";
import { ERROR_ANIMAL_IMAGES } from "errors";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { useQuery } from "@tanstack/react-query";
import { animalImagesQueryOptions } from "api/queryOptions";

export function AnimalImages({ id }: { id: string }) {
  const { data: images, error } = useQuery(animalImagesQueryOptions(id));

  if (error) {
    return (
      <LayoutWrapper>
        <Article {...ERROR_ANIMAL_IMAGES} showTitle={false} />
      </LayoutWrapper>
    );
  }

  if (images?.length) {
    return (
      <ul className={styles["animal-images"]}>
        {images.map((i) => (
          <li key={i.id}>
            <img
              src={ANIMAL_IMAGES_IMAGES_URL + "/" + i.imageName}
              alt={i.imageName}
            />
          </li>
        ))}
      </ul>
    );
  }

  return null;
}
