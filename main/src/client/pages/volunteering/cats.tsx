import { Page as PageModel } from '.prisma/client';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { fetchPage, Page } from 'components/Page';

const ID = 'wolontariat-kot';

export default function VolunteerCats({ ssrPage }) {
  return (
    <>
      <Breadcrumbs items={['Wolontariat', 'Kot']} />
      <Page id={ID} ssrPage={ssrPage} />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  const page = await fetchPage(ID);
  return { props: { ssrPage: page } };
}
