import { AnimalType, Page as PageModel } from '.prisma/client';
import { AnimalList } from 'components/AnimalList/AnimalList';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { fetchPage, Page } from 'components/Page';

const ID = 'psy-do-adopcji';

export default function DogsToAdopt({ ssrPage }) {
  return (
    <>
      <Breadcrumbs items={['Zwierzęta', 'Psy do adopcji']} />
      <Page id={ID} ssrPage={ssrPage} />
      <AnimalList type={AnimalType.DOG} withCategoryOverlay />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  const page = await fetchPage(ID);
  return { props: { ssrPage: page } };
}
