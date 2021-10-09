import { Page as PageModel } from '.prisma/client';
import { fetchPage, Page } from 'components/Page';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';

const ID = 'szukaja-opiekunow';

export default function VirtualToAdopt({ ssrPage }) {
  return (
    <>
      <Breadcrumbs items={['Adopcje wirtualne', 'Szukają opiekunów']} />
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
