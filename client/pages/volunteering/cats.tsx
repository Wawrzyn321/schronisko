import { Page as PageModel } from '@prisma-app/client';
import { fetchPage } from 'api/api';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { Page } from 'components/Page';
import { VolunteeringForm } from 'components/VolunteeringForm/VolunteeringForm';

const ID = 'wolontariat-kot';

export default function VolunteerCats({ ssrPage }: { ssrPage: PageModel }) {
  return (
    <LayoutWrapper>
      <Breadcrumbs items={['Wolontariat', 'Kot']} />
      <Page id={ID} ssrPage={ssrPage} />
      <VolunteeringForm />
    </LayoutWrapper>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  return { props: { ssrPage: (await fetchPage(ID)).data } };
}
