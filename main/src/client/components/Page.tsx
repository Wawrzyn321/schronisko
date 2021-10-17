import { Page as PageModel } from '.prisma/client';
import { SSR_BACKEND_URL, BACKEND_URL, throwingFetch } from 'api';
import { FunctionComponent, useEffect, useState } from 'react';
import { Article } from './Article/Article';

const ERROR_PAGE: PageModel = {
  id: '-1',
  content: 'Tak że tego, coś poszło nie tak.',
  title: 'Błąd ładowania strony',
};

export async function fetchPage(id: string, isSSR = true): Promise<PageModel> {
  try {
    return await throwingFetch(
      (isSSR ? SSR_BACKEND_URL : BACKEND_URL) + '/api/pages/' + id,
    );
  } catch (e) {
    console.warn('error', e);
    return ERROR_PAGE;
  }
}

export function Page({
  id,
  ssrPage,
  Renderer = Article,
}: {
  id: string;
  ssrPage: PageModel;
  Renderer?: FunctionComponent<{ title: string; content: string }>;
}) {
  const [page, setPage] = useState<PageModel>(ssrPage);

  useEffect(() => {
    const loadPage = async () => setPage(await fetchPage(id, false));

    loadPage();
  }, []);

  if (!ssrPage) {
    return null;
  }

  return <Renderer title={page.title} content={page.content} />;
}
