import { MAIN_PAGE_IMAGES_URL } from 'api/config';
import styles from './BigSection.module.scss';
import { NewsListElement } from 'types';
import { Page as PageModel } from '.prisma/client';
import { Article } from 'components/Article/Article';
import { NewsCarousel } from './NewsCarousel/NewsCarousel';
import { PageLink } from './PageLink/PageLink';

type BigSectionProps = { recentNews: NewsListElement[]; mainPage: PageModel };

export function BigSection({ recentNews, mainPage }: BigSectionProps) {
  return (
    <div className={styles['layout-wrapper']}>
      <div className={styles['img-wrapper']} id={styles['yellow']}>
        <img src={MAIN_PAGE_IMAGES_URL + '/yellow.svg'} alt="" />
      </div>
      <div className={styles['flex-end']}>
        {recentNews && (
          <div id={styles['carousel']}>
            <NewsCarousel recentNews={recentNews} />
          </div>
        )}
      </div>
      <div className={styles['img-wrapper']} id={styles['green']}>
        <img src={MAIN_PAGE_IMAGES_URL + '/green.svg'} alt="" />
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
