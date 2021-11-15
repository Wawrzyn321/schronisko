import Link from 'next/link';
import { Animal, AnimalCategory, AnimalType } from '.prisma/client';
import React from 'react';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';

export function AnimalBreadcrumbs({ animal }: { animal: Animal }) {
  const getNameAndHref = () => {
    switch (animal.category) {
      case AnimalCategory.DoAdopcji:
      case AnimalCategory.PilniePotrzebuja:
      case AnimalCategory.Weterani:
        const type = animal.type === AnimalType.DOG ? 'Psy' : 'Koty';
        const hrefType = animal.type === AnimalType.DOG ? 'dogs' : 'cats';
        return {
          name: `${type} do adopcji`,
          href: '/animals/to-adopt/' + hrefType,
        };
      case AnimalCategory.NiedawnoZnalezione:
        return {
          name: `Niedawno znalezione`,
          href: '/animals/recently-found',
        };
      case AnimalCategory.ZaTeczowymMostem:
        return {
          name: `Odeszły`,
          href: '/animals/gone',
        };
      default:
        return { name: type, href: '/' };
    }
  };

  const { name, href } = getNameAndHref();

  return (
    <Breadcrumbs
      items={[
        'Zwierzęta',
        <Link key="last" href={href}>
          {name}
        </Link>,
      ]}
    />
  );
}
