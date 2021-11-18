import { Page as PageModel, VirtualCaretakerType } from '.prisma/client';
import { Page } from 'components/Page';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { AnimalList } from 'components/AnimalList/AnimalList';
import { fetchPage } from 'api';
import { LayoutWrapper } from 'components/LayoutWrapper';

const ID = 'szukaja-opiekunow';

export default function VirtualToAdopt({ ssrPage }: { ssrPage: PageModel }) {
  return (
    <>
      <LayoutWrapper>
        <Breadcrumbs items={['Adopcje wirtualne', 'Szukają opiekunów']} />
        <Page id={ID} ssrPage={ssrPage} />
      </LayoutWrapper>
      <AnimalList
        vCaretakerType={VirtualCaretakerType.Szuka}
        withCategoryOverlay
      />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  return { props: { ssrPage: (await fetchPage(ID)).data } };
}
