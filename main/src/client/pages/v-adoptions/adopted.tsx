import { Page as PageModel, VirtualCaretakerType } from '.prisma/client';
import { fetchPage } from 'api/api';
import { AnimalList } from 'components/AnimalList/AnimalList';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { Page } from 'components/Page';
import React from 'react';

const ID = 'znalazly-opiekunow';

export default function VirtualAdopted({ ssrPage }: { ssrPage: PageModel }) {
  return (
    <>
      <LayoutWrapper>
        <Breadcrumbs items={['Adopcje wirtualne', 'Znalazły opiekunów']} />
        <Page id={ID} ssrPage={ssrPage} />
      </LayoutWrapper>
      <AnimalList vCaretakerType={VirtualCaretakerType.Znalazl} />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  return { props: { ssrPage: (await fetchPage(ID)).data } };
}
