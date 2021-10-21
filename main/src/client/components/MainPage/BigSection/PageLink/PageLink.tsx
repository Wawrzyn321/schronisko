import Link from 'next/link';
import styles from './PageLink.module.scss';

export function PageLink({
  children,
  href,
}: {
  children: React.ReactChildren | string;
  href: string;
}) {
  return (
    <div className={styles['page-link']}>
      <Link href={href}>{children}</Link>
    </div>
  );
}
