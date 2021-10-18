import { AnimalCategory, Page as PageModel } from '.prisma/client';
import { fetchPage, Page } from 'components/Page';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { AnimalList } from 'components/AnimalList/AnimalList';

const ID_main = 'odeszly';
const ID_poem = 'odeszly-wiersz';

interface GoneProps {
  ssrDescription: PageModel;
  ssrPoem: PageModel;
}

export default function Gone({ ssrDescription, ssrPoem }: GoneProps) {
  return (
    //todo wcięcia z lewej i prawej dla artykułów i stron!
    <>
      <Breadcrumbs items={['Zwierzęta', 'Odeszły']} />
      <Page id={ID_main} ssrPage={ssrDescription} />
      <div style={{ maxWidth: '30em' }}>
        <Page id={ID_poem} ssrPage={ssrPoem} showTitle={false} />
      </div>
      <AnimalList category={AnimalCategory.ZaTeczowymMostem} bw />
    </>
  );
}

export async function getServerSideProps(): Promise<{ props: GoneProps }> {
  return {
    props: {
      ssrDescription: await fetchPage(ID_main),
      ssrPoem: await fetchPage(ID_poem),
    },
  };
}
