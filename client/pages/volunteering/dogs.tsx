import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { Page } from "components/Page/Page";
import React from "react";
import { DogVolunteeringWrapper } from "../../components/DogVolunteeringWrapper/DogVolunteeringWrapper";
import { getDogVolunteeringServerSideProps } from "api/getServerSideProps";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";

const ID = "dog-volunteering";

type Props = {
  dehydratedState: DehydratedState;
};

export default function VolunteerDogs({ dehydratedState }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper>
        <Breadcrumbs items={["Wolontariat", "Pies"]} />
        <Page id={ID} />
        <DogVolunteeringWrapper />
      </LayoutWrapper>
    </HydrationBoundary>
  );
}

export async function getServerSideProps() {
  return getDogVolunteeringServerSideProps(ID);
}
