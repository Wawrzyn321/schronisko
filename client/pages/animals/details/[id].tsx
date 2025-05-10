import React from "react";
import { Animal } from "@prisma-app/client";
import { fetchAnimal } from "api/api";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { AnimalFetchContainer } from "components/AnimalFetchContainer/AnimalFetchContainer";
import { AnimalBreadcrumbs } from "components/AnimalDetails/AnimalBreadcrumbs";
import { AnimalHeader } from "components/AnimalDetails/AnimalHeader/AnimalHeader";
import { AnimalMetadata } from "components/AnimalDetails/AnimalMetadata/AnimalMetadata";
import { AnimalImages } from "components/AnimalDetails/AnimalImages/AnimalImages";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { getAnimalDetailsServerSideProps } from "api/getServerSideProps";

type Props = {
  animalId: string;
  dehydratedState: DehydratedState
}

export default function AnimalWrapper({ animalId, dehydratedState }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper>
        <AnimalFetchContainer
          id={animalId}
          Component={AnimalDetails}
        />
      </LayoutWrapper>
    </HydrationBoundary>
  );
}

function AnimalDetails({ animal }: { animal: Animal }) {
  return (
    <>
      <AnimalBreadcrumbs animal={animal} />
      <AnimalHeader animal={animal} />
      <AnimalMetadata animal={animal} />
      <AnimalImages id={animal.id} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getAnimalDetailsServerSideProps(context)
}
