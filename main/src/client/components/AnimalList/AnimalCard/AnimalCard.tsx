import styles from './AnimalCard.module.scss';
import { SITE_IMAGES_URL } from 'api/config';
import { Overlay } from './Overlay';
import { Animal } from '.prisma/client';
import { AnimalImage } from './AnimalImage';

interface AnimalCardProps {
  animal: Animal;
  showOverlay: boolean;
  openModal: (animal: Animal) => any;
}

export function AnimalCard({
  animal,
  showOverlay = false,
  openModal,
}: AnimalCardProps) {
  const image = <AnimalImage animal={animal} />;

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
          onClick={() => openModal(animal)}
        />
        {showOverlay && <Overlay category={animal.category} />}
      </div>
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
