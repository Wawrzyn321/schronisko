import { AnimalCategory, Page as PageModel } from '.prisma/client';
import { fetchPage, Page } from 'components/Page';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { AnimalList } from 'components/AnimalList/AnimalList';

const ID = 'odeszly';

export default function Gone({ ssrPage }) {
  return (
    //todo wcięcia z lewej i prawej dla artykułów i stron!
    <>
      <Breadcrumbs items={['Zwierzęta', 'Odeszły']} />
      <Page id={ID} ssrPage={ssrPage} />
      <AnimalList category={AnimalCategory.ZaTeczowymMostem} bw />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  const page = await fetchPage(ID);
  return { props: { ssrPage: page } };
}
