import { Page as PageModel } from '@prisma-app/client';
import { fetchPage } from 'api/api';
import { LayoutWrapper } from 'components/LayoutWrapper/LayoutWrapper';
import { Page } from 'components/Page';

const ID = 'jak-pomoc';

export default function HowTo({ ssrPage }: { ssrPage: PageModel }) {
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
