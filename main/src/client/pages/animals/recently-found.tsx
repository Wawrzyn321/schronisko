import { AnimalCategory, Page as PageModel } from '.prisma/client';
import { AnimalList } from 'components/AnimalList/AnimalList';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { fetchPage, Page } from 'components/Page';

const ID = 'zwierzeta-znalezione';

export default function RecentlyFound({ ssrPage }) {
  return (
    <>
      <Breadcrumbs items={['Zwierzęta', 'Zwierzęta znalezione']} />
      <Page id={ID} ssrPage={ssrPage} />
      <AnimalList category={AnimalCategory.NiedawnoZnalezione} />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  const page = await fetchPage(ID);
  return { props: { ssrPage: page } };
}
