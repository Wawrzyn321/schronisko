import { ANIMAL_IMAGES_IMAGES_URL } from 'api/config';
import styles from './AnimalImages.module.scss';
import { Article } from 'components/Article/Article';
import { ERROR_ANIMAL_IMAGES } from 'errors';
import { LayoutWrapper } from 'components/LayoutWrapper/LayoutWrapper';
import { useLoadAnimalImages } from './useLoadAnimalImages';

export function AnimalImages({ id }: { id: string }) {
  const images = useLoadAnimalImages(id);

  if (images) {
    return (
      <ul className={styles['animal-images']}>
        {images.map((i) => (
          <li key={i.id}>
            <img src={ANIMAL_IMAGES_IMAGES_URL + '/' + i.imageName} alt={i.imageName} />
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <LayoutWrapper>
        <Article {...ERROR_ANIMAL_IMAGES} showTitle={false} />
      </LayoutWrapper>
    );
  }
}
