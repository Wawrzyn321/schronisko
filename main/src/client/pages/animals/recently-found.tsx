import { AnimalCategory, Page as PageModel } from '.prisma/client';
import { fetchPage } from 'api';
import { AnimalList } from 'components/AnimalList/AnimalList';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { Page } from 'components/Page';

const ID = 'zwierzeta-znalezione';

export default function RecentlyFound({ ssrPage }: { ssrPage: PageModel }) {
  return (
    <>
      <LayoutWrapper>
        <Breadcrumbs items={['Zwierzęta', 'Zwierzęta znalezione']} />
        <Page id={ID} ssrPage={ssrPage} />
      </LayoutWrapper>
      <AnimalList categories={[AnimalCategory.NiedawnoZnalezione]} />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  return { props: { ssrPage: (await fetchPage(ID)).data } };
}
