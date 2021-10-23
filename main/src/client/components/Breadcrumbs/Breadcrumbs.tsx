import React from 'react';
import styles from './Breadcrumbs.module.scss';

export function Breadcrumbs({
  items,
}: {
  items: (string | React.ReactNode)[];
}) {
  const last = items.splice(-1);

  return (
    <ul className={styles.breadcrumbs}>
      {items.map((str, index) => (
        <li key={index}>{str}</li>
      ))}
      <li>
        <strong>{last}</strong>
      </li>
    </ul>
  );
}
