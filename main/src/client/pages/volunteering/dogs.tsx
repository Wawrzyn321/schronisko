import { Page as PageModel, Settings } from '.prisma/client';
import { fetchDogVolunteeringPage, fetchSettings } from 'api';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { Page } from 'components/Page';
import React from 'react';
import { DogVolunteeringWrapper } from '../../components/DogVolunteeringWrapper';

const ID = ''; //todo

type VolunteerDogsProps = {
  ssrPage: PageModel;
  ssrSettings: Settings[];
};

export default function VolunteerDogs({
  ssrPage,
  ssrSettings,
}: VolunteerDogsProps) {
  return (
    <LayoutWrapper>
      <Breadcrumbs items={['Wolontariat', 'Pies']} />
      <VolunteerDogsPage ssrPage={ssrPage} />
      <DogVolunteeringWrapper ssrSettings={ssrSettings} />
    </LayoutWrapper>
  );
}

function VolunteerDogsPage({ ssrPage }: { ssrPage: PageModel }) {
  return <Page id={ID} ssrPage={ssrPage} fetchFn={fetchDogVolunteeringPage} />;
}

export async function getServerSideProps(): Promise<{
  props: VolunteerDogsProps;
}> {
  return {
    props: {
      ssrPage: (await fetchDogVolunteeringPage(ID)).data,
      ssrSettings: (await fetchSettings()).data,
    },
  };
}
