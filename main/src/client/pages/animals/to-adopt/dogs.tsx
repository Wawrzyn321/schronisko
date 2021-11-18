import { AnimalType, Page as PageModel } from '.prisma/client';
import { fetchPage } from 'api';
import { AnimalList } from 'components/AnimalList/AnimalList';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { Page } from 'components/Page';
import React from 'react';
import { isForAdoption } from 'types';

const ID = 'psy-do-adopcji';

export default function DogsToAdopt({ ssrPage }: { ssrPage: PageModel }) {
  return (
    <>
      <LayoutWrapper>
        <Breadcrumbs items={['Zwierzęta', 'Psy do adopcji']} />
        <Page id={ID} ssrPage={ssrPage} />
      </LayoutWrapper>
      <AnimalList
        type={AnimalType.DOG}
        filter={isForAdoption}
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
