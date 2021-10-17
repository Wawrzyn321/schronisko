import {
  Animal,
  AnimalCategory,
  Page as PageModel,
  VirtualCaretakerType,
} from '.prisma/client';
import { fetchPage, Page } from 'components/Page';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { AnimalList } from 'components/AnimalList/AnimalList';
import { useState } from 'react';
import { AnimalCategoryLegend } from './AnimalCategoryLegend/AnimalCategoryLegend';

const ID = 'szukaja-opiekunow';

export default function VirtualToAdopt({ ssrPage }) {
  const [category, setCategory] = useState<AnimalCategory | undefined>();

  const filter = (animal: Animal) => {
    if (!category) return true;
    return animal.category === category;
  };

  return (
    <>
      <Breadcrumbs items={['Adopcje wirtualne', 'Szukają opiekunów']} />
      <Page id={ID} ssrPage={ssrPage} />
      <AnimalCategoryLegend category={category} setCategory={setCategory} />
      <AnimalList
        filter={(a) =>
          a.virtualCaretakerType === VirtualCaretakerType.Szuka && filter(a)
        }
        showOverlay
      />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  const page = await fetchPage(ID);
  return { props: { ssrPage: page } };
}
