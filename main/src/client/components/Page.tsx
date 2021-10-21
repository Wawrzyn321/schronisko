import { Page as PageModel } from '.prisma/client';
import { FetchError, fetchPage } from 'api';
import { ERROR_PAGE, ERROR_PAGE_NOT_FOUND } from 'errors';
import { useEffect, useState } from 'react';
import { Article } from './Article/Article';

interface PageProps {
  id: string;
  ssrPage: PageModel;
  showTitle?: boolean;
}

export function Page({ id, ssrPage, showTitle = true }: PageProps) {
  const [page, setPage] = useState<PageModel>(ssrPage);
  const [error, setError] = useState<FetchError>();

  useEffect(() => {
    const loadPage = async () => {
      const { data, error } = await fetchPage(id, false);
      setPage(data);
      setError(error);
    };

    loadPage();
  }, []);

  if (page) {
    return (
      <Article
        title={page.title}
        content={page.content}
        showTitle={showTitle}
      />
    );
  } else if (error) {
    if (error.statusCode === 404) {
      <Article {...ERROR_PAGE_NOT_FOUND} showTitle={showTitle} />;
    } else {
      <Article {...ERROR_PAGE} showTitle={showTitle} />;
    }
  } else {
    return <p>'Ładowanie...'</p>;
  }
}
