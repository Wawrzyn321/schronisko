import { Page as PageModel } from '.prisma/client';
import { useEffect, useState } from 'react';
import { Article } from '../components/Article/Article';

const ID = 'o-nas';

async function fetchPage(id: string): Promise<PageModel> {
  const response = await fetch('http://localhost:60045' + '/api/pages/' + id);
  return await response.json();
}

function Page({ id, ssrPage }: { id: string; ssrPage: PageModel }) {
  const [page, setPage] = useState<PageModel>(ssrPage);

  useEffect(() => {
    const loadPage = async () => {
      try {
        setPage(await fetchPage(id));
      } catch (e) {
        console.log('error', e);
        alert('gunwo TODO');
      }
    };

    loadPage();
  }, []);

  return <Article title={page.title} content={page.content} />;
}

export default function About({ ssrPage }) {
  return <Page id={ID} ssrPage={ssrPage} />;
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  try {
    const page = await fetchPage(ID);
    return { props: { ssrPage: page } };
  } catch (e) {
    console.warn(e);
    return {
      props: {
        ssrPage: {
          id: '-1',
          content: 'error',
          title: e.message,
        },
      },
    };
  }
}
