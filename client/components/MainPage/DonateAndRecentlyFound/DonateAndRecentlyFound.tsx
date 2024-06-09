import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import donate from 'public/site/main/donate.png';
import recentlyFound from 'public/site/main/recently-found.png';
import styles from './DonateAndRecentlyFound.module.scss';

function ImageLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactChild;
}) {
  return (
    <div style={{ cursor: 'pointer' }}>
      <Link href={href}>
        {children}
      </Link>
    </div>
  );
}

export function DonateAndRecentlyFound() {
  return (
    <div className={styles['donate-and-recently-found']}>
      <ImageLink href="/pages/dotacje">
        <Image src={donate} alt="przekaż darowiznę" width={776} height={255}/>
      </ImageLink>
      <ImageLink href="/animals/recently-found">
        <Image src={recentlyFound} alt="niedawno znalezione" width={400} height={255} />
      </ImageLink>
    </div>
  );
}
