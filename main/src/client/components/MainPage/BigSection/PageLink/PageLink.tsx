import Link from 'next/link';
import styles from './PageLink.module.scss';

export function PageLink({
  children,
  href,
}: {
  children: string;
  href: string;
}) {
  return (
    <Link href={href} passHref className={styles['page-link']}>
      {children}
    </Link>
  );
}
