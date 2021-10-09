import styles from './Breadcrumbs.module.scss';

export function Breadcrumbs({ items }: { items: string[] }) {
  const last = items.splice(-1);

  return (
    <ul className={styles.breadcrumbs}>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
      <li>
        <strong>{last}</strong>
      </li>
    </ul>
  );
}
