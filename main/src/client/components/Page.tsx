import { Page as PageModel } from '.prisma/client';
import { BACKEND_URL, throwingFetch } from 'api';
import { useEffect, useState } from 'react';
import { Article } from './Article/Article';

const ERROR_PAGE: PageModel = {
  id: '-1',
  content: 'Tak że tego, coś poszło nie tak.',
  title: 'Błąd ładowania strony',
};

export async function fetchPage(id: string): Promise<PageModel> {
  try {
    return await throwingFetch(BACKEND_URL + '/api/pages/' + id);
  } catch (e) {
    console.warn('error', e);
    return ERROR_PAGE;
  }
}

export function Page({ id, ssrPage }: { id: string; ssrPage: PageModel }) {
  const [page, setPage] = useState<PageModel>(ssrPage);

  useEffect(() => {
    const loadPage = async () => setPage(await fetchPage(id));

    loadPage();
  }, []);

  return <Article title={page.title} content={page.content} />;
}
