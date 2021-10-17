import Link from 'next/link';
import styles from './PageLink.module.scss';

export function PageLink({ children, href }) {
  return (
    <div className={styles['page-link']}>
      <Link href={href}>{children}</Link>
    </div>
  );
}
