import {
  AnimalType,
  Page as PageModel,
  VirtualCaretakerType,
} from '.prisma/client';
import { AnimalList } from 'components/AnimalList/AnimalList';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { fetchPage, Page } from 'components/Page';

const ID = 'koty-do-adopcji';

export default function CatsToAdopt({ ssrPage }) {
  return (
    <>
      <Breadcrumbs items={['Zwierzęta', 'Koty do adopcji']} />
      <Page id={ID} ssrPage={ssrPage} />
      <AnimalList
        type={AnimalType.CAT}
        filter={(a) => a.virtualCaretakerType === VirtualCaretakerType.Znalazl}
        withCategoryOverlay
      />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  const page = await fetchPage(ID);
  return { props: { ssrPage: page } };
}
