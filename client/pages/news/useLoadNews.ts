import { News } from '@prisma-app/client';
import { FetchError, fetchNews } from 'api/api';
import { useEffect, useState } from 'react';

export function useLoadNews(id: string, ssrNews: News) {
    const [news, setNews] = useState<News>(ssrNews);
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

    return {news, error}
}