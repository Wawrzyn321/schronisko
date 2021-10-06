import { Page as PageModel } from '.prisma/client';
import { fetchPage, Page } from 'components/Page';

const ID = 'jak-pomoc';

export default function HowTo({ ssrPage }) {
  return <Page id={ID} ssrPage={ssrPage} />;
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  const page = await fetchPage(ID);
  return { props: { ssrPage: page } };
}
