import Link from "next/link";
import styles from './posts.module.css'

export default function Posts() {
  return (
    <div className={styles['any-name']}>
      <Link href="/">back</Link>
    </div>
  );
}
