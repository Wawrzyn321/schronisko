import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { AnimalCategory, AnimalType } from "@prisma-app/client";
import { AnimalList } from "components/AnimalList/AnimalList";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { Page } from "components/Page/Page";
import React from "react";
import { getAnimalListPageServerSideProps } from "api/getServerSideProps";
import { GetServerSidePropsContext } from "next";

const ID = "psy-do-adopcji";

const CATEGORIES = [
  AnimalCategory.DoAdopcji,
  AnimalCategory.PilniePotrzebuja,
  AnimalCategory.Weterani,
];

const ANIMAL_TYPE = AnimalType.DOG;

type Props = {
  initialPage: number;
  dehydratedState: DehydratedState;
};

export default function DogsToAdopt({ dehydratedState, initialPage }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper>
        <Breadcrumbs items={["Zwierzęta", "Psy do adopcji"]} />
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

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<{ props: Props }> {
  return getAnimalListPageServerSideProps(ID, {
    categories: CATEGORIES,
    type: ANIMAL_TYPE,
  })(context);
}
