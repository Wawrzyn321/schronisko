import { Page as PageModel } from '.prisma/client';
import { BigSection } from 'components/MainPage/BigSection/BigSection';
import { AfterAdoption } from 'components/MainPage/AfterAdoption/AfterAdoption';
import { FaqBanner } from 'components/MainPage/FaqBanner';
import { DonateAndRecentlyFound } from 'components/MainPage/DonateAndRecentlyFound/DonateAndRecentlyFound';

import { fetchAfterAdoptionAnimals, fetchPage, fetchRecentNews } from 'api/api';
import { AfterAdoptionAnimal, NewsListElement } from 'types';

const ID = 'glowna-adopcje';

type HomeProps = {
  ssrData: {
    afterAdoptionAnimals: AfterAdoptionAnimal[];
    recentNews: NewsListElement[];
    mainPage: PageModel;
  };
};

export default function Home({ ssrData }: HomeProps) {
  return (
    <>
      <button onClick={() => {(null as any).frontend}}>crash</button>
      <BigSection mainPage={ssrData.mainPage} recentNews={ssrData.recentNews} />
      <AfterAdoption afterAdoptionAnimals={ssrData.afterAdoptionAnimals} />
      <FaqBanner />
      <DonateAndRecentlyFound />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: HomeProps;
}> {
  const afterAdoptionAnimals = (await fetchAfterAdoptionAnimals()).data;
  const recentNews = (await fetchRecentNews()).data;
  const mainPage = (await fetchPage(ID)).data;
  return { props: { ssrData: { afterAdoptionAnimals, recentNews, mainPage } } };
}
