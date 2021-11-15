import Link from 'next/link';
import { buildAnimalImageUrl, buildAnimalUrl } from '_util';
import { Animal, AnimalCategory } from '.prisma/client';

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

  const canGoToDetails =
    animal.category !== AnimalCategory.ZaTeczowymMostem &&
    animal.category !== AnimalCategory.ZnalazlyDom;
  if (canGoToDetails) {
    return (
      <Link href={buildAnimalUrl(animal)}>
        <a style={{ cursor: 'pointer' }}>{image}</a>
      </Link>
    );
  } else {
    return image;
  }
}
