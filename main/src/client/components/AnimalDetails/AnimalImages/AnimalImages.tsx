import { useEffect, useState } from 'react';
import { ANIMAL_IMAGES_IMAGES_URL, fetchAnimalImages } from 'api';
import { AnimalImage } from '.prisma/client';
import styles from './AnimalImages.module.scss';
import { Article } from 'components/Article/Article';
import { ERROR_ANIMAL_IMAGES } from 'errors';

export function AnimalImages({ id }: { id: string }) {
  const [images, setImages] = useState<AnimalImage[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const { data } = await fetchAnimalImages(id);
      setImages(data);
    };

    loadImages();
  }, []);

  if (images) {
    return (
      <ul className={styles['animal-images']}>
        {images.map((i) => (
          <li key={i.id}>
            <img src={ANIMAL_IMAGES_IMAGES_URL + '/' + i.imageName} />
          </li>
        ))}
      </ul>
    );
  } else {
    return <Article {...ERROR_ANIMAL_IMAGES} showTitle={false} />;
  }
}
