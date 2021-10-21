import { IMAGES_URL } from 'api';
import Image from 'next/image';
import whiteArrow from 'public/site/main/white arrow.svg';
import styles from './NewsCarousel.module.scss';
import { NewsListElement } from 'types';
import { useState } from 'react';
import { PageLink } from '../PageLink/PageLink';

function CarouselControl({
  index,
  total,
  setIndex,
}: {
  index: number;
  total: number;
  setIndex: (i: number) => any;
}) {
  const inc = () => setIndex((index + 1) % total);

  const dec = () => setIndex(index - 1 < 0 ? total - 1 : index - 1);

  return (
    <>
      <div className={styles['carousel__left-right']}>
        <Image src={whiteArrow} alt="lewo" onClick={dec} />
        <Image src={whiteArrow} alt="prawo" onClick={inc} />
      </div>
      <ul className={styles['carousel__bottom']}>
        {new Array(total).fill(null).map((_: null, i) => (
          <li
            className={index === i ? styles['carousel--current'] : ''}
            key={i}
            onClick={() => setIndex(i)}
          />
        ))}
      </ul>
    </>
  );
}

export function NewsCarousel({
  recentNews,
}: {
  recentNews: NewsListElement[];
}) {
  const [index, setIndex] = useState<number>(0);

  const currentNews = recentNews[index];

  const currentItem = currentNews && (
    <img src={IMAGES_URL + '/' + currentNews.imageName} alt={currentNews.id} />
  );

  const title = currentNews && (
    <div className={styles['carousel__title']}>
      <PageLink href={'/news/' + currentNews.id}>{currentNews.title}</PageLink>
    </div>
  );

  const description = currentNews && (
    <div className={styles['carousel__description']}>
      <p>{currentNews.description}</p>
    </div>
  );

  return (
    <div className={styles['carousel__wrapper']}>
      <CarouselControl
        total={recentNews.length}
        index={index}
        setIndex={setIndex}
      />
      {currentItem}
      {title}
      {description}
    </div>
  );
}
