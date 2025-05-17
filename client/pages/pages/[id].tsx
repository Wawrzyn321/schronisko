import { Page } from "components/Page/Page";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { GetServerSidePropsContext } from "next";
import { getGenericPageServerSideProps } from "api/getServerSideProps";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { fetchPageIds } from "api/queries";

type Props = {
  pageId: string;
  dehydratedState: DehydratedState;
};

export default function PageComponent({ pageId, dehydratedState }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper>
        <Page id={pageId} />
      </LayoutWrapper>
    </HydrationBoundary>
  );
}

export async function getStaticPaths() {
  const ids = await fetchPageIds();

  const paths = ids.map((id: string) => ({
    params: { id },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  return getGenericPageServerSideProps(context);
}
