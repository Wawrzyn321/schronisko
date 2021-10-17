import { IdWrapper } from 'components/IdWrapper';
import { SSR_BACKEND_URL, BACKEND_URL, throwingFetch } from 'api';
import { useEffect, useState } from 'react';
import { News as NewsModel } from '.prisma/client';
import { Article } from 'components/Article/Article';

export default function News() {
  return <IdWrapper Component={ActualNews} />;
}

function ActualNews({ id, ssrNews }: { id: string; ssrNews: NewsModel }) {
  const [news, setNews] = useState<NewsModel>(ssrNews);

  useEffect(() => {
    const loadPage = async () => setNews(await fetchNews(id, false));

    loadPage();
  }, []);

  if (!news) return null;

  return (
    <Article title={news.title} content={news.content} date={news.createdAt} />
  );
}

// const ERROR_PAGE: News = {
//   id: '-1',
//   content: 'Tak że tego, coś poszło nie tak.',
//   title: 'Błąd ładowania strony',
// };

export async function fetchNews(id: string, isSSR = true): Promise<NewsModel> {
  try {
    return await throwingFetch(
      (isSSR ? SSR_BACKEND_URL : BACKEND_URL) + '/api/news/' + id,
    );
  } catch (e) {
    console.warn('error', e);
    return null;
  }
}

export async function getServerSideProps(context: any): Promise<{
  props: { ssrNews: NewsModel };
}> {
  const { id } = context.query;
  const news = await fetchNews(id, true);
  return { props: { ssrNews: news } };
}
