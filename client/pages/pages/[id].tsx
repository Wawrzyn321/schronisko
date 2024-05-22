import { IdWrapper } from 'components/IdWrapper';
import { Page as PageModel } from '@prisma-app/client';
import { Page } from 'components/Page';
import { fetchPageIds, fetchPage } from 'api/api';
import { LayoutWrapper } from 'components/LayoutWrapper/LayoutWrapper';
import { getStaticPropsProps } from 'types';

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

export async function getStaticPaths() {
  const ids = await fetchPageIds();

  const paths = ids.map((id: string) => ({
    params: { id },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: getStaticPropsProps): Promise<{
  props: { ssrPage: PageModel };
}> {
  const { id } = params;
  return { props: { ssrPage: (await fetchPage(id)).data } };
}
