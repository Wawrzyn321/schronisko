import { IMAGES_URL } from "api/config";
import styles from "./NewsCarousel.module.scss";
import { NewsListElement } from "types";
import { useState } from "react";
import { PageLink } from "../PageLink/PageLink";
import { CarouselControl } from "./CarouselControl/CarouselControl";

export function NewsCarousel({
  recentNews,
}: {
  recentNews: NewsListElement[];
}) {
  const [index, setIndex] = useState<number>(0);

  const currentNews = recentNews[index];

  const currentItem = currentNews && (
    <img
      src={IMAGES_URL + "/news/" + currentNews.imageName}
      alt={currentNews.title}
      className={styles["carousel__image"]}
    />
  );

  const title = currentNews && (
    <div className={styles["carousel__title"]}>
      <PageLink
        href={"/news/" + currentNews.id}
        textClassName={styles["title-content"]}
      >
        {currentNews.title}
      </PageLink>
    </div>
  );

  const description = currentNews?.description && (
    <div className={styles["carousel__description"]}>
      <p>{currentNews.description}</p>
    </div>
  );

  return (
    <div className={styles["carousel__wrapper"]}>
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
