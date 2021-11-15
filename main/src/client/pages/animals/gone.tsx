import { AnimalCategory, Page as PageModel } from '.prisma/client';
import { Page } from 'components/Page';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { AnimalList } from 'components/AnimalList/AnimalList';
import { fetchPage } from 'api';
import React from 'react';
import { LayoutWrapper } from 'components/LayoutWrapper';

const ID_main = 'odeszly';
const ID_poem = 'odeszly-wiersz';

interface GoneProps {
  ssrDescription: PageModel;
  ssrPoem: PageModel;
}

export default function Gone(props: GoneProps) {
  return (
    <>
      <LayoutWrapper>
        <Breadcrumbs items={['Zwierzęta', 'Odeszły']} />
        <Page id={ID_main} ssrPage={props.ssrDescription} />
        <div style={{ maxWidth: '30em' }}>
          <Page id={ID_poem} ssrPage={props.ssrPoem} showTitle={false} />
        </div>
      </LayoutWrapper>
      <AnimalList category={AnimalCategory.ZaTeczowymMostem} />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: GoneProps;
}> {
  return {
    props: {
      ssrDescription: (await fetchPage(ID_main)).data,
      ssrPoem: (await fetchPage(ID_poem)).data,
    },
  };
}
