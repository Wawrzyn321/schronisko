import { BigSection } from "components/MainPage/BigSection/BigSection";
import { AfterAdoption } from "components/MainPage/AfterAdoption/AfterAdoption";
import { GetInvolved } from "components/MainPage/GetInvolved/GetInvolved";
import { DonateAndRecentlyFound } from "components/MainPage/DonateAndRecentlyFound/DonateAndRecentlyFound";

import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { getMainPageServerSideProps } from "api/getServerSideProps";

type Props = {
  dehydratedState: DehydratedState;
};

export default function Home({ dehydratedState }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <BigSection />
      <AfterAdoption />
      <GetInvolved />
      <DonateAndRecentlyFound />
    </HydrationBoundary>
  );
}

export async function getServerSideProps() {
  return getMainPageServerSideProps();
}
