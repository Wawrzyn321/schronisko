// import Link from 'next/link';
import styles from './PageLink.module.scss';

export function PageLink({
  children,
  href,
}: {
  children: string;
  href: string;
}) {
  return (
    <a href={href}>
      <span className={styles['page-link-blob']}>
        <span className={styles['page-link']}>{children}</span>
      </span>
    </a>
  );
}
