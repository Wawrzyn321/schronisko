import styles from './AnimalCard.module.scss';
import { AnimalCategory } from '.prisma/client';
import { OVERLAYS_URL } from 'api';

export function Overlay({ category }: { category: AnimalCategory; }) {
  const Img = ({ name }: { name: string; }) => (
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
