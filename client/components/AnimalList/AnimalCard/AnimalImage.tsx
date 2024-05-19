// import Link from 'next/link';
import { buildAnimalImageUrl, buildAnimalUrl } from 'api/config';
import { Animal, AnimalCategory } from '@prisma-app/client';
import { isReadonly } from '../isReadonly';

export function AnimalImage({ animal }: { animal: Animal }) {
  const bwMode = animal.category === AnimalCategory.ZaTeczowymMostem;
  const imageStyle = bwMode ? { filter: 'grayscale(1)' } : {};

  const image = (
    <img
      src={buildAnimalImageUrl(animal)}
      alt={animal.name}
      width="340px"
      height="340px"
      style={imageStyle}
    />
  );

  const canGoToDetails = !isReadonly(animal.category);
  if (canGoToDetails) {
    return (
      <a href={buildAnimalUrl(animal.id)}>
        <a style={{ cursor: 'pointer' }}>{image}</a>
      </a>
    );
  } else {
    return image;
  }
}
