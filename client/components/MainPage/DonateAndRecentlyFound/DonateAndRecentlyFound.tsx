import React from 'react';
import Image from 'next/image';
// import Link from 'next/link';
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
      <a href={href}>
        {children}
      </a>
    </div>
  );
}

export function DonateAndRecentlyFound() {
  return (
    <div className={styles['donate-and-recently-found']}>
      <ImageLink href="/pages/dotacje">
        <Image src={donate} alt="przekaż darowiznę" />
      </ImageLink>
      <ImageLink href="/animals/recently-found">
        <Image src={recentlyFound} alt="niedawno znalezione" />
      </ImageLink>
    </div>
  );
}
