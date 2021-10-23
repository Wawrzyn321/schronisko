import { IdWrapper } from 'components/IdWrapper';
import { FetchError, fetchNews } from 'api';
import { useEffect, useState } from 'react';
import { News as NewsModel } from '.prisma/client';
import { Article } from 'components/Article/Article';
import { ERROR_GENERIC, ERROR_NEWS_NOT_FOUND } from 'errors';
import { SSRContext } from 'types';
import { LayoutWrapper } from 'components/LayoutWrapper';

export default function News() {
  return <IdWrapper Component={ActualNews} />;
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

    loadPage();
  }, []);

  if (news) {
    return (
      <LayoutWrapper>
        <Article
          title={news.title}
          content={news.content}
          date={news.createdAt}
        />
      </LayoutWrapper>
    );
  } else if (error) {
    if (error.statusCode === 404) {
      return <Article {...ERROR_NEWS_NOT_FOUND} />;
    } else {
      return <Article {...ERROR_GENERIC} />;
    }
  } else {
    return 'Ładowanie...';
  }
}

export async function getServerSideProps(context: SSRContext): Promise<{
  props: { ssrNews: NewsModel };
}> {
  const { id } = context.query;
  const news = await fetchNews(id, true);
  return { props: { ssrNews: news.data } };
}
