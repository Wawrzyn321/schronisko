import { Page as PageModel } from '.prisma/client';
import { fetchPage, Page } from 'components/Page';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

const ID = 'odeszly';

export default function Gone({ ssrPage }) {
  return (
    <>
      <Breadcrumbs items={['Zwierzęta', 'Odeszły']} />
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
