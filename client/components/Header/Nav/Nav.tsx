import React from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Nav.module.scss';

type SubListItem = {
  name: string;
  path: string;
};

function LinkBorder({ to }: { to: string }) {
  const router = useRouter();

  const isActive = router.pathname.startsWith(to);
  const borderClassName = isActive
    ? `${styles.border} ${styles.active}`
    : styles.border;

  return <div className={borderClassName} />;
}

function SimpleLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a href={to}>{children}</a>
      <LinkBorder to={to} />
    </li>
  );
}

function ParentLink({
  to,
  title,
  links,
}: {
  to: string;
  title: string;
  links: SubListItem[];
}) {
  return (
    <li className={styles.anchor}>
      <span>{title}</span>
      <ul>
        {links.map((link: SubListItem) => (
          <li key={link.path}>
            <a href={to + link.path}>
              <span>{link.name}</span>
            </a>
          </li>
        ))}
      </ul>
      <LinkBorder to={to} />
    </li>
  );
}

export function Nav() {
  const animalsLinks: SubListItem[] = [
    { name: 'Psy do adopcji', path: '/to-adopt/dogs' },
    { name: 'Koty do adopcji', path: '/to-adopt/cats' },
    { name: 'Zwierzęta znalezione', path: '/recently-found' },
    { name: 'Znalazły dom', path: '/adopted' },
    { name: 'Odeszły', path: '/gone' },
  ];

  const volunteeringLinks: SubListItem[] = [
    { name: 'Pies', path: '/dogs' },
    { name: 'Kot', path: '/cats' },
  ];

  const vAdoptionLinks: SubListItem[] = [
    { name: 'Jak adoptować wirtualnie', path: '/how-to' },
    { name: 'Szukają opiekunów', path: '/to-adopt' },
    { name: 'Znalazły opiekunów', path: '/adopted' },
  ];

  return (
    <nav className={styles.nav}>
      <ul>
        <SimpleLink to="/about">O nas</SimpleLink>
        <ParentLink to="/animals" title="Zwierzęta" links={animalsLinks} />
        <ParentLink
          to="/v-adoptions"
          title="Adopcje wirtualne"
          links={vAdoptionLinks}
        />
        <ParentLink
          to="/volunteering"
          title="Wolontariat"
          links={volunteeringLinks}
        />
        <SimpleLink to="/how-to">Jak pomóc</SimpleLink>
        <SimpleLink to="/contact">Kontakt</SimpleLink>
      </ul>
    </nav>
  );
}
