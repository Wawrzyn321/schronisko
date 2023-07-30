import { Page as PageModel } from '.prisma/client';
import { fetchPage } from 'api/api';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { Page } from 'components/Page';

const ID = 'o-nas';

export default function About({ ssrPage }: { ssrPage: PageModel }) {
  return (
    <LayoutWrapper>
      <Page id={ID} ssrPage={ssrPage} />
    </LayoutWrapper>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  return { props: { ssrPage: (await fetchPage(ID)).data } };
}
