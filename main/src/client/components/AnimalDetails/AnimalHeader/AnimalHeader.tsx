import { Animal } from '.prisma/client';
import styles from './AnimalHeader.module.scss';

export function AnimalHeader({ animal }: { animal: Animal }) {
  return (
    <>
      <h1>{animal.name}</h1>
      <div className={styles['animal-details--description']}>
        {animal.description.split('\n').map((str, i) => (
          <p key={i}>{str}</p>
        ))}
      </div>
    </>
  );
}
