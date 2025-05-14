import { AnimalCategory, VirtualCaretakerType } from "@prisma-app/client";
import { Page } from "components/Page/Page";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { AnimalList } from "components/AnimalList/AnimalList";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { getAnimalListPageServerSideProps } from "api/getServerSideProps";

const ID = "szukaja-opiekunow";

const V_CARETAKER_TYPE = VirtualCaretakerType.Szuka;

const CATEGORIES = [
  AnimalCategory.DoAdopcji,
  AnimalCategory.PilniePotrzebuja,
  AnimalCategory.Weterani,
];

type Props = {
  initialPage: number;
  dehydratedState: DehydratedState;
};

export default function VirtualToAdopt({
  dehydratedState,
  initialPage,
}: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper>
        <Breadcrumbs items={["Adopcje wirtualne", "Szukają opiekunów"]} />
        <Page id={ID} />
      </LayoutWrapper>
      <AnimalList
        vCaretakerType={V_CARETAKER_TYPE}
        categories={CATEGORIES}
        withCategoryOverlay
        initialPage={initialPage}
      />
    </HydrationBoundary>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<{ props: Props }> {
  return getAnimalListPageServerSideProps(ID, {
    vCaretakerType: V_CARETAKER_TYPE,
    categories: CATEGORIES,
  })(context);
}
