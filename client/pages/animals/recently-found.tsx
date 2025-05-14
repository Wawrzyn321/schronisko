import { AnimalCategory } from "@prisma-app/client";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { getAnimalListPageServerSideProps } from "api/getServerSideProps";
import { AnimalList } from "components/AnimalList/AnimalList";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { Page } from "components/Page/Page";
import { GetServerSidePropsContext } from "next";

const ID = "zwierzeta-znalezione";

const CATEGORIES = [AnimalCategory.NiedawnoZnalezione];

type Props = {
  initialPage: number;
  dehydratedState: DehydratedState;
};

export default function RecentlyFound({ dehydratedState, initialPage }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper>
        <Breadcrumbs items={["Zwierzęta", "Zwierzęta znalezione"]} />
        <Page id={ID} />
      </LayoutWrapper>
      <AnimalList categories={CATEGORIES} initialPage={initialPage} />
    </HydrationBoundary>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<{ props: Props }> {
  return getAnimalListPageServerSideProps(ID, { categories: CATEGORIES })(
    context,
  );
}
