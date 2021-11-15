import Image from 'next/image';
import opiekun from 'public/site/animal-details/opiekun.svg';
import kontakt from 'public/site/animal-details/kontakt.svg';
import styles from './AnimalMetadata.module.scss';
import { Animal } from '.prisma/client';

const MiniIcon = ({ name, icon }: { icon: any; name: string }) => (
  <Image src={icon} alt={name} width="30px" height="30px" />
);

export function AnimalMetadata({ animal }: { animal: Animal }) {
  return (
    <dl className={styles['animal-metadata']}>
      <div>
        <dt>
          <MiniIcon name="opiekun" icon={opiekun} />
          Opiekun wirtualny:
        </dt>
        <dd>{animal.virtualCaretakerName || 'brak'}</dd>
      </div>
      <div>
        <dt>
          <MiniIcon name="kontakt" icon={kontakt} />
          Kontakt:
        </dt>
        <dd>{animal.contactInfo}</dd>
      </div>
    </dl>
  );
}
