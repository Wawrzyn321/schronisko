import { Page as PageModel } from '.prisma/client';
import { fetchPage, Page } from 'components/Page';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

const ID = 'jak-adoptowac-wirtualnie';

export default function VirtualHowTo({ ssrPage }) {
  return (
    <>
      <Breadcrumbs items={['Adopcje wirtualne', 'Jak adoptować wirtualnie']} />
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
