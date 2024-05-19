// import Link from 'next/link';
import { Animal, AnimalCategory, AnimalType } from '@prisma-app/client';
import React from 'react';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';

export function AnimalBreadcrumbs({ animal }: { animal: Animal }) {
  const getNameAndHref = () => {
    const type = animal.type === AnimalType.DOG ? 'Psy' : 'Koty';
    switch (animal.category) {
      case AnimalCategory.DoAdopcji:
      case AnimalCategory.PilniePotrzebuja:
      case AnimalCategory.Weterani:
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
        <a key="last" href={href}>
          {name}
        </a>,
      ]}
    />
  );
}
