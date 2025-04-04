import { AnimalCategory, Page as PageModel } from '@prisma-app/client';
import { fetchPage } from 'api/api';
import { AnimalList } from 'components/AnimalList/AnimalList';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { LayoutWrapper } from 'components/LayoutWrapper/LayoutWrapper';
import { Page } from 'components/Page';
import React from 'react';

const ID = 'odnalazly-dom';

export default function Adopted({ ssrPage }: { ssrPage: PageModel }) {
  return (
    <>
      <LayoutWrapper>
        <Breadcrumbs items={['Zwierzęta', 'Znalazły dom']} />
        <Page id={ID} ssrPage={ssrPage} />
      </LayoutWrapper>
      <AnimalList categories={[AnimalCategory.ZnalazlyDom]} />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  return { props: { ssrPage: (await fetchPage(ID)).data } };
}
