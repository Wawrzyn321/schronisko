import Image from 'next/image';
import Link from 'next/link';
import donate from 'public/site/main/donate.png';
import recentlyFound from 'public/site/main/just-found.png';
import styles from './DonateAndRecentlyFound.module.scss';

export function DonateAndRecentlyFound() {
  return (
    <div className={styles['donate-and-just-found']}>
      <Image src={donate} alt="przekaż darowiznę"/>
      <div style={{ cursor: 'pointer' }}>
        <Link href="/animals/recently-found">
          <>
            <Image src={recentlyFound} alt="niedawno znalezione" />
          </>
        </Link>
      </div>
    </div>
  );
}
