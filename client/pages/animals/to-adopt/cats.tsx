import {
  DehydratedState,
  HydrationBoundary,
} from '@tanstack/react-query'
import {
  AnimalCategory,
  AnimalType,
} from "@prisma-app/client";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { Page } from "components/Page/Page";
import { AnimalList } from 'components/AnimalList/AnimalList';
import { GetServerSidePropsContext } from 'next';
import { getAnimalListPageServerSideProps } from 'api/getServerSideProps';

const ID = "koty-do-adopcji";

const CATEGORIES = [
  AnimalCategory.DoAdopcji,
  AnimalCategory.PilniePotrzebuja,
  AnimalCategory.Weterani,
];

const ANIMAL_TYPE = AnimalType.CAT;

type Props = {
  initialPage: number;
  dehydratedState: DehydratedState
}

export default function CatsToAdopt({ dehydratedState, initialPage }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper>
        <Breadcrumbs items={["Zwierzęta", "Koty do adopcji"]} />
        <Page id={ID} />
      </LayoutWrapper>
      <AnimalList
        categories={CATEGORIES}
        type={ANIMAL_TYPE}
        withCategoryOverlay
        initialPage={initialPage}
      />
    </HydrationBoundary>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: Props }> {
  return getAnimalListPageServerSideProps(ID, {
    categories: CATEGORIES,
    type: ANIMAL_TYPE
  })(context)
}