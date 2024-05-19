import { IdWrapper } from 'components/IdWrapper';
import { FetchError, fetchNews } from 'api/api';
import { useEffect, useState } from 'react';
import { News as NewsModel } from '@prisma-app/client';
import { Article } from 'components/Article/Article';
import { ErrorWrapper, ERROR_GENERIC, ERROR_NEWS_NOT_FOUND } from 'errors';
import { getStaticPropsProps } from 'types';

export default function News({ ssrNews }: { ssrNews: NewsModel }) {
  return <IdWrapper Component={ActualNews} ssrNews={ssrNews} />;
}

function ActualNews({ id, ssrNews }: { id: string; ssrNews: NewsModel }) {
  const [news, setNews] = useState<NewsModel>(ssrNews);
  const [error, setError] = useState<FetchError>(null);

  useEffect(() => {
    const loadPage = async () => {
      const { data, error } = await fetchNews(id);
      setNews(data);
      setError(error);
    };

    if (!ssrNews) {
      loadPage();
    }
  }, [id, ssrNews]);

  return (
    <ErrorWrapper
      isLoaded={!!news}
      error={error}
      errorGeneric={ERROR_GENERIC}
      error404={ERROR_NEWS_NOT_FOUND}
    >
      <Article
        title={news?.title}
        content={news?.content}
        date={news?.createdAt}
      />
    </ErrorWrapper>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }: getStaticPropsProps): Promise<{
  props: { ssrNews: NewsModel };
  revalidate: number;
}> {
  const { id } = params;
  return {
    props: { ssrNews: (await fetchNews(id)).data },
    revalidate: 60,
  };
}
