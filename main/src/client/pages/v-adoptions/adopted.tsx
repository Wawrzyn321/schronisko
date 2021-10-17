import { Page as PageModel, VirtualCaretakerType } from '.prisma/client';
import { AnimalList } from 'components/AnimalList/AnimalList';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { fetchPage, Page } from 'components/Page';

const ID = 'znalazly-opiekunow';

export default function VirtualAdopted({ ssrPage }) {
  return (
    <>
      <Breadcrumbs items={['Adopcje wirtualne', 'Znalazły opiekunów']} />
      <Page id={ID} ssrPage={ssrPage} />
      <AnimalList
        filter={(a) => a.virtualCaretakerType === VirtualCaretakerType.Znalazl}
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
