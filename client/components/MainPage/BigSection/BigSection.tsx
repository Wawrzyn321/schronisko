import styles from './BigSection.module.scss';
import { NewsListElement } from 'types';
import { Page as PageModel } from '.prisma/client';
import { Article } from 'components/Article/Article';
import { NewsCarousel } from './NewsCarousel/NewsCarousel';
import { PageLink } from './PageLink/PageLink';
import yellow from 'public/site/main/yellow.svg';
import green from 'public/site/main/green.svg';
import Image from 'next/image';

type BigSectionProps = { recentNews: NewsListElement[]; mainPage: PageModel };

export function BigSection({ recentNews, mainPage }: BigSectionProps) {
  return (
    <div className={styles['layout-wrapper']}>
      <div className={styles['img-wrapper']} id={styles['yellow']}>
        <Image src={yellow} alt="" />
      </div>
      <div className={styles['flex-end']}>
        {recentNews && (
          <div id={styles['carousel']}>
            <NewsCarousel recentNews={recentNews} />
          </div>
        )}
      </div>
      <div className={styles['img-wrapper']} id={styles['green']}>
        <Image src={green} alt="" />
        {mainPage && (
          <div className={styles['article']}>
            <h1>Adopcje</h1>
            <Article
              title={mainPage.title}
              content={mainPage.content}
              showTitle={false}
            />
          </div>
        )}
      </div>
      <div id={styles['links']}>
        <div className={styles['flex-end']}>
          <PageLink href="/animals/to-adopt">Adoptuj</PageLink>
        </div>
        <div className={styles['flex-end']}>
          <PageLink href="/v-adoptions/to-adopt">Adoptuj wirtualnie</PageLink>
        </div>
      </div>
    </div>
  );
}
