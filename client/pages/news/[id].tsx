import { Article } from "components/Article/Article";
import { ErrorWrapper, ERROR_GENERIC, ERROR_NEWS_NOT_FOUND } from "errors";
import { DehydratedState, HydrationBoundary, useQuery } from "@tanstack/react-query";
import { newsQueryOptions } from "api/queryOptions";
import { GetServerSidePropsContext } from "next";
import { getNewsServerSideOptions } from "api/getServerSideProps";

type Props = {
  dehydratedState: DehydratedState;
  newsId: string;
}

export default function News({ dehydratedState, newsId }: Props) {
  return <HydrationBoundary state={dehydratedState}>
    <NewsComponent id={newsId} />
  </HydrationBoundary>
}

function NewsComponent({ id }: { id: string }) {
  const { data: news, error } = useQuery(newsQueryOptions(id));

  return (
    <ErrorWrapper
      isLoaded={!!news}
      error={error}
      errorGeneric={ERROR_GENERIC}
      error404={ERROR_NEWS_NOT_FOUND}
    >
      <Article
        title={news.title}
        content={news.content}
        date={news.createdAt}
      />
    </ErrorWrapper>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  return getNewsServerSideOptions(context)
}
