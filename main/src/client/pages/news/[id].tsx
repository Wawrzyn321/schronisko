import { IdWrapper } from 'components/IdWrapper';
import { FetchError, fetchNews } from 'api';
import { useEffect, useState } from 'react';
import { News as NewsModel } from '.prisma/client';
import { Article } from 'components/Article/Article';
import { ErrorWrapper, ERROR_GENERIC, ERROR_NEWS_NOT_FOUND } from 'errors';
import { SSRContext } from 'types';

export default function News({ ssrNews }: { ssrNews: NewsModel }) {
  return <IdWrapper Component={ActualNews} ssrNews={ssrNews} />;
}

function ActualNews({ id, ssrNews }: { id: string; ssrNews: NewsModel }) {
  const [news, setNews] = useState<NewsModel>(ssrNews);
  const [error, setError] = useState<FetchError>(null);

  useEffect(() => {
    const loadPage = async () => {
      const { data, error } = await fetchNews(id, false);
      setNews(data);
      setError(error);
    };

    if (!ssrNews) {
      loadPage();
    }
  }, []);

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

export async function getServerSideProps(context: SSRContext): Promise<{
  props: { ssrNews: NewsModel };
}> {
  const { id } = context.query;
  const news = await fetchNews(id, true);
  return { props: { ssrNews: news.data } };
}
