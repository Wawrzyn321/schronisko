import { MediaIcons } from './MediaIcons/MediaIcons';
import { AddressInfo } from './AddressInfo/AddressInfo';
import { LeadBy } from './LeadBy/LeadBy';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer>
      <div className={styles['footer-flex']}>
        <LeadBy />
        <div className={styles['footer-flex']}>
          <AddressInfo />
          <MediaIcons />
        </div>
      </div>
      <div className={styles.spacer} />
      <p className={styles.copyright}>Copyright 2021 R</p>
    </footer>
  );
}
