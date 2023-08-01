import styles from './AnimalCard.module.scss';
import { AnimalCategory } from '.prisma/client';

function OverlayImage({ name }: { name: 'najdluzej-czekam' | 'pilnie-szukam-domu' }) {
  const imageName = name == 'najdluzej-czekam' ? 'najdluzej czekam.svg' : 'pilnie szukam domu.svg';
  const src = '/site/overlays/' + imageName;

  return (
    <img src={src} alt="" className={styles['overlay']} />
  );
}

export function Overlay({ category }: { category: AnimalCategory }) {

  if (category === AnimalCategory.Weterani) {
    return <OverlayImage name="najdluzej-czekam" />;
  } else if (category === AnimalCategory.PilniePotrzebuja) {
    return <OverlayImage name="pilnie-szukam-domu" />;
  } else {
    return null;
  }
}
