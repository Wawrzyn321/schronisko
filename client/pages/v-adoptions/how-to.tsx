import { Page } from "components/Page/Page";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { getSimplePageServerSideProps } from "api/getServerSideProps";

const ID = "jak-adoptowac-wirtualnie";

type Props = {
  dehydratedState: DehydratedState;
};
export default function VirtualHowTo({ dehydratedState }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper>
        <Breadcrumbs
          items={["Adopcje wirtualne", "Jak adoptować wirtualnie"]}
        />
        <Page id={ID} />
      </LayoutWrapper>
    </HydrationBoundary>
  );
}

export async function getServerSideProps() {
  return getSimplePageServerSideProps(ID);
}
