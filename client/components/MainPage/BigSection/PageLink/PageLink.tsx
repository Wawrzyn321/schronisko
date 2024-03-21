// import Link from 'next/link';
import styles from './PageLink.module.scss';

export function PageLink({
  children,
  href,
  textClassName
}: {
  children: string;
  href: string;
  textClassName?: string;
}) {
  return (
    <a href={href} className={styles['page-link-blob']}>
      <span className={`${styles['page-link']} ${textClassName ?? ''}`}>{children}</span>
    </a>
  );
}

