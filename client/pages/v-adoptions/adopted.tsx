import { AnimalCategory, Page as PageModel, VirtualCaretakerType } from "@prisma-app/client";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { fetchPage } from "api/api";
import { getAnimalListPageServerSideProps } from "api/getServerSideProps";
import { AnimalList } from "components/AnimalList/AnimalList";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { Page } from "components/Page/Page";
import { GetServerSidePropsContext } from "next";
import React from "react";

const ID = "znalazly-opiekunow";

const V_CARETAKER_TYPE = VirtualCaretakerType.Znalazl;

const CATEGORIES = [
  AnimalCategory.DoAdopcji,
  AnimalCategory.PilniePotrzebuja,
  AnimalCategory.Weterani,
]

type Props = {
  initialPage: number;
  dehydratedState: DehydratedState
}

export default function VirtualAdopted({ dehydratedState, initialPage }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper>
        <Breadcrumbs items={["Adopcje wirtualne", "Znalazły opiekunów"]} />
        <Page id={ID} />
      </LayoutWrapper>
      <AnimalList categories={CATEGORIES} initialPage={initialPage} vCaretakerType={VirtualCaretakerType.Znalazl} />
    </HydrationBoundary>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: Props }> {
  return getAnimalListPageServerSideProps(ID, {
    vCaretakerType: V_CARETAKER_TYPE,
    categories: CATEGORIES
  })(context)
}