import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { getSimplePageServerSideProps } from "api/getServerSideProps";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { Page } from "components/Page/Page";
import { VolunteeringForm } from "components/VolunteeringForm/VolunteeringForm";

const ID = "wolontariat-kot";

type Props = {
  dehydratedState: DehydratedState
}

export default function VolunteerCats({ dehydratedState }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper>
        <Breadcrumbs items={["Wolontariat", "Kot"]} />
        <Page id={ID} />
        <VolunteeringForm />
      </LayoutWrapper>
    </HydrationBoundary>
  );
}

export async function getServerSideProps() {
  return getSimplePageServerSideProps(ID);
}
