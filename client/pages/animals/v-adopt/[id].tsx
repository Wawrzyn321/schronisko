import Link from "next/link";
import { Animal } from "@prisma-app/client";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { AnimalFetchContainer } from "../../../components/AnimalFetchContainer/AnimalFetchContainer";
import { Page } from "components/Page/Page";
import { VAdoptionForm } from "../../../components/VAdoptionForm/VAdoptionForm";
import { GetServerSidePropsContext } from "next";
import { getAnimalDetailsServerSideProps } from "api/getServerSideProps";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  animalId: string;
  dehydratedState: DehydratedState
}

export default function AnimalWrapper({ animalId, dehydratedState }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <AnimalFetchContainer
        id={animalId}
        Component={VAdoptionDetails}
      />
    </HydrationBoundary>
  );
}

function VAdoptionDetails({ animal }: { animal: Animal }) {
  return (
    <>
      <Breadcrumbs
        items={[
          "Adopcje wirtualne",
          <Link key="to-adopt" href="/v-adoptions/to-adopt">
            Szukają opiekunów
          </Link>,
          <Link key="animal-name" href={`/animals/details/${animal.id}`}>
            {animal.name}
          </Link>,
        ]}
      />
      <Page id="info-po-adopcji-wirtualnej" />
      <VAdoptionForm animal={animal} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getAnimalDetailsServerSideProps(context)
}
