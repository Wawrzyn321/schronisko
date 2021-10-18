import { Page as PageModel } from '.prisma/client';
import { fetchPage, Page } from 'components/Page';
import { BigSection } from 'components/MainPage/BigSection/BigSection';
import { AfterAdoption } from 'components/MainPage/AfterAdoption/AfterAdoption';
import { Faq } from 'components/MainPage/Faq';
import { DonateAndRecentlyFound } from 'components/MainPage/DonateAndRecentlyFound/DonateAndRecentlyFound';

import { SSR_BACKEND_URL, BACKEND_URL, throwingFetch } from 'api';
import { AfterAdoptionAnimal, NewsListElement } from 'types';

const ID = 'glowna-adopcje';
interface HomeProps {
  ssrData: {
    afterAdoptionAnimals: AfterAdoptionAnimal[];
    recentNews: NewsListElement[];
    mainPage: PageModel;
  };
}

export default function Home({ ssrData }: HomeProps) {
  return (
    <>
      <BigSection mainPage={ssrData.mainPage} recentNews={ssrData.recentNews} />
      <AfterAdoption afterAdoptionAnimals={ssrData.afterAdoptionAnimals} />
      <Faq />
      <DonateAndRecentlyFound />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: HomeProps;
}> {
  const afterAdoptionAnimals = await fetchAfterAdoptionAnimals();
  const recentNews = await fetchRecentNews();
  const mainPage = await fetchPage(ID);
  return { props: { ssrData: { afterAdoptionAnimals, recentNews, mainPage } } };
}

export async function fetchAfterAdoptionAnimals(
  isSSR = true,
): Promise<AfterAdoptionAnimal[]> {
  try {
    return await throwingFetch(
      (isSSR ? SSR_BACKEND_URL : BACKEND_URL) +
        '/api/c/animals/after-adoption?count=3',
    );
  } catch (e) {
    console.warn('error', e);
    return [];
  }
}

export async function fetchRecentNews(
  isSSR = true,
): Promise<NewsListElement[]> {
  try {
    return await throwingFetch(
      (isSSR ? SSR_BACKEND_URL : BACKEND_URL) + '/api/c/news/recent?count=5',
    );
  } catch (e) {
    console.warn('error', e);
    return [];
  }
}
