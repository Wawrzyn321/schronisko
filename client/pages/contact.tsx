import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { getSimplePageServerSideProps } from "api/getServerSideProps";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { Page } from "components/Page/Page";

const ID = "kontakt";

type Props = {
  dehydratedState: DehydratedState;
};

export default function Contact({ dehydratedState }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper>
        <Page id={ID} />
      </LayoutWrapper>
    </HydrationBoundary>
  );
}

export async function getServerSideProps() {
  return getSimplePageServerSideProps(ID);
}
