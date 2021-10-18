import {
  Animal,
  AnimalCategory,
  Page as PageModel,
  VirtualCaretakerType,
} from '.prisma/client';
import { fetchPage, Page } from 'components/Page';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { AnimalList } from 'components/AnimalList/AnimalList';

const ID = 'szukaja-opiekunow';

export default function VirtualToAdopt({ ssrPage }) {
  return (
    <>
      <Breadcrumbs items={['Adopcje wirtualne', 'Szukają opiekunów']} />
      <Page id={ID} ssrPage={ssrPage} />
      <AnimalList
        filter={(a) => a.virtualCaretakerType === VirtualCaretakerType.Szuka}
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
