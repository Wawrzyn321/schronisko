import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/site/logo-mini.png';
import styles from './HeaderTitle.module.scss';

export function HeaderTitle() {
  return (
    <Link href="/" className={styles['header-title']}>
      <span className={styles['header-title__wrapper']}>
        <Image src={logo} alt="logo" />
        <span className={styles['title']}>
          <p>Schronisko</p>
          <p>Dla bezdomnych zwierząt</p>
          <p>W Sosnowcu</p>
        </span>
      </span>
    </Link>
  );
}