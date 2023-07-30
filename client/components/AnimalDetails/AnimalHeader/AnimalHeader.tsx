import Link from 'next/link';
import { Animal, VirtualCaretakerType } from '.prisma/client';
import styles from './AnimalHeader.module.scss';
import { isReadonly } from 'components/AnimalList/isReadonly';

export function AnimalHeader({ animal }: { animal: Animal }) {
  const canVAdopt =
    !isReadonly(animal.category) &&
    animal.virtualCaretakerType === VirtualCaretakerType.Szuka;

  const vAdoptLink = `/animals/v-adopt/${animal.id}`;

  return (
    <>
      <div className={styles['animal-details--header']}>
        <h1>{animal.name}</h1>
        {canVAdopt && (
          <Link href={vAdoptLink}>
            <span className={styles['animal-details--v-adopt-button']}>
              Adoptuj wirtualnie
            </span>
          </Link>
        )}
      </div>
      <div className={styles['animal-details--description']}>
        {animal.description.split('\n').map((str, i) => (
          <p key={i}>{str}</p>
        ))}
      </div>
    </>
  );
}
