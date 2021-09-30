import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/site/logo-mini.png';
import styles from './HeaderTitle.module.scss';

export function HeaderTitle() {
  return (
    <Link href="/">
      <a className={styles['header-title']}>
        <Image src={logo} alt="logo" />
        <div className={styles['title']}>
          <p>Schronisko</p>
          <p>Dla bezdomnych zwierząt</p>
          <p>W Sosnowcu</p>
        </div>
      </a>
    </Link>
  );
}
