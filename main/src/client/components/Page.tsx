import { Page as PageModel } from '.prisma/client';
import { FetchError, fetchPage } from 'api/api';
import { ErrorWrapper, ERROR_PAGE, ERROR_PAGE_NOT_FOUND } from 'errors';
import { useEffect, useState } from 'react';
import { PageFetchFn } from 'types';
import { Article } from './Article/Article';

type PageProps = {
  id: string;
  ssrPage: PageModel;
  showTitle?: boolean;
  fetchFn?: PageFetchFn;
}

export function Page({
  id,
  ssrPage,
  fetchFn = fetchPage,
  showTitle = true,
}: PageProps) {
  const [page, setPage] = useState<PageModel>(ssrPage);
  const [error, setError] = useState<FetchError>();

  useEffect(() => {
    const loadPage = async () => {
      const { data, error } = await fetchFn(id);
      setPage(data);
      setError(error);
    };

    if (!ssrPage) {
      loadPage();
    }
  }, []);

  return (
    <ErrorWrapper
      isLoaded={!!page}
      error={error}
      errorGeneric={{ ...ERROR_PAGE, showTitle }}
      error404={{ ...ERROR_PAGE_NOT_FOUND, showTitle }}
    >
      <Article
        title={page?.title}
        content={page?.content}
        showTitle={showTitle}
      />
    </ErrorWrapper>
  );
}
