import { IdWrapper } from 'components/IdWrapper';
import { Page as PageModel } from '.prisma/client';
import { Page } from 'components/Page';
import { fetchPage } from 'api';
import { SSRContext } from 'types';
import { LayoutWrapper } from 'components/LayoutWrapper';

export default function PageComponent({ ssrPage }: { ssrPage: PageModel }) {
  return <IdWrapper Component={ActualPage} ssrPage={ssrPage} />;
}

export function ActualPage({
  id,
  ssrPage,
}: {
  id: string;
  ssrPage: PageModel;
}) {
  return (
    <LayoutWrapper>
      <Page id={id} ssrPage={ssrPage} />
    </LayoutWrapper>
  );
}

export async function getServerSideProps(context: SSRContext): Promise<{
  props: { ssrPage: PageModel };
}> {
  const { id } = context.query;
  return { props: { ssrPage: (await fetchPage(id)).data } };
}
