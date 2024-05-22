import { useEffect, useState } from 'react';
import { ANIMAL_IMAGES_IMAGES_URL } from 'api/config';
import { AnimalImage } from '@prisma-app/client';
import styles from './AnimalImages.module.scss';
import { Article } from 'components/Article/Article';
import { ERROR_ANIMAL_IMAGES } from 'errors';
import { LayoutWrapper } from 'components/LayoutWrapper/LayoutWrapper';
import { fetchAnimalImages } from 'api/api';

export function AnimalImages({ id }: { id: string }) {
  const [images, setImages] = useState<AnimalImage[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const { data } = await fetchAnimalImages(id);
      setImages(data);
    };

    if (images.length === 0) {
      loadImages();
    }
  }, [id, images.length]);

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
