import { Page as PageModel } from '.prisma/client';
import { fetchPage, Page } from 'components/Page';

const ID = 'o-nas';

export default function About({ ssrPage }) {
  return <Page id={ID} ssrPage={ssrPage} />;
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  const page = await fetchPage(ID);
  return { props: { ssrPage: page } };
}