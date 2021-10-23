import styles from './AnimalCard.module.scss';
import Link from 'next/link';
import { Animal } from '.prisma/client';
import { IMAGES_URL, SITE_IMAGES_URL } from 'api';
import { buildAnimalUrl } from '_util';
import { Overlay } from './Overlay';

export function AnimalCard({
  animal,
  showOverlay = false,
  bwMode = false,
  openModal,
}: {
  animal: Animal;
  showOverlay: boolean;
  bwMode: boolean;
  openModal: (img: string, bwMode: boolean) => any;
}) {
  let image = (
    <img
      src={IMAGES_URL + '/' + animal.imageName}
      alt={animal.name}
      width="340px"
      height="340px"
    />
  );

  if (!bwMode) {
    image = (
      <Link href={buildAnimalUrl(animal)}>
        <a>{image}</a>
      </Link>
    );
  }

  return (
    <li className={styles['animal-card']}>
      <div className={styles['img-wrapper']}>
        {image}
        <img
          className={styles['mag-glass']}
          src={SITE_IMAGES_URL + '/lupa.svg'}
          alt="Powiększ"
          width="20px"
          height="20px"
          onClick={() => openModal(IMAGES_URL + '/' + animal.imageName, bwMode)}
        />
      </div>
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
