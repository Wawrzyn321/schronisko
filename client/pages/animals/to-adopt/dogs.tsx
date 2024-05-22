import { AnimalCategory, AnimalType, Page as PageModel } from '@prisma-app/client';
import { fetchPage } from 'api/api';
import { AnimalList } from 'components/AnimalList/AnimalList';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { LayoutWrapper } from 'components/LayoutWrapper/LayoutWrapper';
import { Page } from 'components/Page';
import React from 'react';

const ID = 'psy-do-adopcji';

export default function DogsToAdopt({ ssrPage }: { ssrPage: PageModel }) {
  return (
    <>
      <LayoutWrapper>
        <Breadcrumbs items={['Zwierzęta', 'Psy do adopcji']} />
        <Page id={ID} ssrPage={ssrPage} />
      </LayoutWrapper>
      <AnimalList
        categories={[
          AnimalCategory.DoAdopcji,
          AnimalCategory.PilniePotrzebuja,
          AnimalCategory.Weterani,
        ]}
        type={AnimalType.DOG}
        withCategoryOverlay
      />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  return { props: { ssrPage: (await fetchPage(ID)).data } };
}
