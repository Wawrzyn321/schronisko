import { Page as PageModel, Settings } from '@prisma-app/client';
import { fetchDogVolunteeringPage, fetchSettings } from 'api/api';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { LayoutWrapper } from 'components/LayoutWrapper/LayoutWrapper';
import { Page } from 'components/Page';
import React from 'react';
import { DogVolunteeringWrapper } from '../../components/DogVolunteeringWrapper';

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
  return (
    <Page id={null} ssrPage={ssrPage} fetchFn={fetchDogVolunteeringPage} />
  );
}

export async function getServerSideProps(): Promise<{
  props: VolunteerDogsProps;
}> {
  return {
    props: {
      ssrPage: (await fetchDogVolunteeringPage()).data,
      ssrSettings: (await fetchSettings()).data,
    },
  };
}
