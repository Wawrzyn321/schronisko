import styles from "./BigSection.module.scss";
import { NewsListElement } from "types";
import { Page as PageModel } from "@prisma-app/client";
import { Article } from "components/Article/Article";
import { NewsCarousel } from "./NewsCarousel/NewsCarousel";
import { PageLink } from "./PageLink/PageLink";
import yellow from "public/site/main/yellow.svg";
import green from "public/site/main/green.svg";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { pageQueryOptions, recentNewsQueryOptions } from "api/queryOptions";

export function BigSection() {
  return (
    <div className={styles["layout-wrapper"]}>
      <div className={styles["img-wrapper"]}>
        <Image src={yellow} alt="" width={1200} height={780} />
      </div>
      <RecentNews />
      <MainPageArticle />
      <Links />
    </div>
  );
}

function RecentNews() {
  const {data: recentNews} = useQuery(recentNewsQueryOptions())

  return <div className={styles["flex-end"]}>
    {recentNews && (
      <div id={styles["carousel"]}>
        <NewsCarousel recentNews={recentNews} />
      </div>
    )}
  </div>
}

function MainPageArticle() {
  const { data: mainPage } = useQuery(pageQueryOptions('glowna-adopcje'))

  return <div className={styles["img-wrapper"]} id={styles["green"]}>
    <Image src={green} alt="" width={1020} height={600} />
    {mainPage && (
      <div className={styles["article"]}>
        <h1>Adopcje</h1>
        <Article
          title={mainPage.title}
          content={mainPage.content}
          showTitle={false}
        />
      </div>
    )}
  </div>
}

function Links() {
  return <div id={styles["links"]}>
    <div className={styles["flex-end"]}>
      <PageLink href="/animals/to-adopt">Adoptuj</PageLink>
    </div>
    <div className={styles["flex-end"]}>
      <PageLink href="/v-adoptions/to-adopt">Adoptuj wirtualnie</PageLink>
    </div>
  </div>
}