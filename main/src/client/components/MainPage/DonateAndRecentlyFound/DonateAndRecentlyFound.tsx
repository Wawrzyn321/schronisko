import Image from 'next/image';
import Link from 'next/link';
import donate from 'public/site/main/donate.png';
import recentlyFound from 'public/site/main/recently-found.png';
import styles from './DonateAndRecentlyFound.module.scss';

export function DonateAndRecentlyFound() {
  console.log('wtf');
  return (
    <div className={styles['donate-and-recently-found']}>
      <Image src={donate} alt="przekaż darowiznę" />
      <div style={{ cursor: 'pointer' }}>
        <Link href="/animals/recently-found">
          <a>
            <Image src={recentlyFound} alt="niedawno znalezione" />
          </a>
        </Link>
      </div>
    </div>
  );
}