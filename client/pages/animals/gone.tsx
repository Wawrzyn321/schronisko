import { GetServerSidePropsContext } from "next";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { Page } from "components/Page/Page";
import { AnimalList } from "components/AnimalList/AnimalList";
import { AnimalCategory } from "@prisma-app/client";
import { getGonePageServerSideProps } from "api/getServerSideProps";

const ID_main = "odeszly";
const ID_poem = "odeszly-wiersz";

type Props = {
  initialPage: number;
  dehydratedState: DehydratedState;
};

export default function Gone({ dehydratedState, initialPage }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper>
        <Breadcrumbs items={["Zwierzęta", "Odeszły"]} />
        <Page id={ID_main} />
        <div style={{ maxWidth: "30em" }}>
          <Page id={ID_poem} showTitle={false} />
        </div>
      </LayoutWrapper>
      <AnimalList
        categories={[AnimalCategory.ZaTeczowymMostem]}
        initialPage={initialPage}
      />
    </HydrationBoundary>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getGonePageServerSideProps(ID_main, ID_poem)(context);
}
