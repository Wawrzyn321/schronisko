import { Page as PageModel } from '.prisma/client';
import { fetchPage } from 'api';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { Page } from 'components/Page';

const ID = 'wolontariat-kot';

export default function VolunteerCats({ ssrPage }: { ssrPage: PageModel }) {
  return (
    <LayoutWrapper>
      <Breadcrumbs items={['Wolontariat', 'Kot']} />
      <Page id={ID} ssrPage={ssrPage} />
    </LayoutWrapper>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  return { props: { ssrPage: (await fetchPage(ID)).data } };
}
