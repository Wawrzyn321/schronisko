import Link from 'next/link';
import { buildAnimalImageUrl, buildAnimalUrl } from '_util';
import { Animal, AnimalCategory } from '.prisma/client';
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
      <Link href={buildAnimalUrl(animal.id)}>
        <a style={{ cursor: 'pointer' }}>{image}</a>
      </Link>
    );
  } else {
    return image;
  }
}
