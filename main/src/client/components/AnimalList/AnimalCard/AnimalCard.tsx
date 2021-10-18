import styles from './AnimalCard.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Animal, AnimalCategory } from '.prisma/client';
import { IMAGES_URL, OVERLAYS_URL } from 'api';
import { buildAnimalUrl } from '_util';

function Overlay({ category }: { category: AnimalCategory }) {
  const Img = ({ name }: { name: string }) => (
    <img src={OVERLAYS_URL + '/' + name} alt="" className={styles['overlay']} />
  );

  if (category === AnimalCategory.Weterani) {
    return <Img name="najdluzej czekam.svg" />;
  } else if (category === AnimalCategory.PilniePotrzebuja) {
    return <Img name="pilnie szukam domu.svg" />;
  } else {
    return null;
  }
}

export function AnimalCard({
  animal,
  showOverlay = false,
}: {
  animal: Animal;
  showOverlay: boolean;
}) {
  return (
    <li className={styles['animal-card']}>
      <Link href={buildAnimalUrl(animal)}>
        <a>
          <Image
            src={IMAGES_URL + '/' + animal.imageName}
            alt={animal.name}
            width="340px"
            height="340px"
          />
        </a>
      </Link>
      {showOverlay && <Overlay category={animal.category} />}
      <div className={styles['animal-ids']}>
        <span className={styles['animal-name']}>{animal.name}</span>
        <span>{animal.refNo}</span>
      </div>
      <dl className={styles['animal-data']}>
        <dt>Miejsce pobytu:</dt>
        <dd>{animal.location}</dd>
        <dt>Opiekun wirtualny:</dt>
        <dd>{animal.virtualCaretakerName || 'Brak'}</dd>
      </dl>
    </li>
  );
}
