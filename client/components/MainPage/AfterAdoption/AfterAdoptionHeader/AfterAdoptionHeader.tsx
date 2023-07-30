import Image from 'next/image';
import dog from 'public/site/main/pies.svg';
import cat from 'public/site/main/kot.svg';
import styles from './AfterAdoptionHeader.module.scss';

export function AfterAdoptionHeader() {
  return (
    <div className={styles['after-adoption-animals__header']}>
      <div className={styles['after-adoption-animals__header__title']}>
        Dziś po adopcji
        <Image src={dog} alt="piesł" />
        <Image src={cat} alt="kitku" />
      </div>
      <div className={styles['after-adoption-animals__header__description']}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa
        cupiditate porro, I guess.
      </div>
    </div>
  );
}
