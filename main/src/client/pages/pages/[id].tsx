import { IdWrapper } from 'components/IdWrapper';
import { Page as PageModel } from '.prisma/client';
import { fetchPage, Page } from 'components/Page';

const ID = 'o-nas';

export default function PageComponent({ ssrPage }) {
  return <IdWrapper Component={ActualPage} ssrPage={ssrPage}/>;
}

export function ActualPage({ id, ssrPage }) {
  return <Page id={id} ssrPage={ssrPage} />;
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  const page = await fetchPage(ID);
  return { props: { ssrPage: page } };
}
