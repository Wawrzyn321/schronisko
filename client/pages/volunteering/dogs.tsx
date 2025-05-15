import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { Page } from "components/Page/Page";
import React from "react";
import { getDogVolunteeringServerSideProps } from "api/getServerSideProps";
import {
  DehydratedState,
  HydrationBoundary,
  useQuery,
} from "@tanstack/react-query";
import { VolunteeringForm } from "components/VolunteeringForm/VolunteeringForm";
import { AnimalType } from "@prisma-app/client";
import { dogVolunteeringQueryOptions } from "api/queryOptions";

const ID = "dog-volunteering";

type Props = {
  dehydratedState: DehydratedState;
};

export default function VolunteerDogs({ dehydratedState }: Props) {
  const { data: isDogVolunteeringEnabled } = useQuery(
    dogVolunteeringQueryOptions(),
  );

  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper>
        <Breadcrumbs items={["Wolontariat", "Pies"]} />
        <Page id={ID} />
        {isDogVolunteeringEnabled && (
          <VolunteeringForm animalType={AnimalType.DOG} />
        )}
      </LayoutWrapper>
    </HydrationBoundary>
  );
}

export async function getServerSideProps() {
  return getDogVolunteeringServerSideProps(ID);
}
