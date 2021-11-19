import { Page as PageModel } from '.prisma/client';
import { fetchDogVolunteeringPage } from 'api';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { Page } from 'components/Page';
import React from 'react';

const ID = '';

export default function VolunteerDogs({ ssrPage }: { ssrPage: PageModel }) {
  return (
    <LayoutWrapper>
      <Breadcrumbs items={['Wolontariat', 'Pies']} />
      <VolunteerDogsPage ssrPage={ssrPage} />
      
      A TU BĘDZIE FORMULARZ
    </LayoutWrapper>
  );
}

function VolunteerDogsPage({ ssrPage }: { ssrPage: PageModel }) {
  return <Page id={ID} ssrPage={ssrPage} fetchFn={fetchDogVolunteeringPage} />;
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  return {
    props: { ssrPage: (await fetchDogVolunteeringPage(ID, true)).data },
  };
}
