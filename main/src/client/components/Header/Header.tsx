import { HeaderContactInfo } from './HeaderContactInfo/HeaderContactInfo';
import { HeaderTitle } from './HeaderTitle/HeaderTitle';
import { Nav } from './Nav/Nav';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header>
      <div className={styles['top-bar']}>
        <HeaderTitle />
        <HeaderContactInfo />
      </div>
      <Nav />
    </header>
  );
}
