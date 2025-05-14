import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  afterAdoptionQueryOptions,
  animalDetailsQueryOptions,
  animalImagesQueryOptions,
  animalsQueryOptions,
  newsQueryOptions,
  pageQueryOptions,
  recentNewsQueryOptions,
  settingsQueryOptions,
} from "./queryOptions";
import {
  AnimalCategory,
  AnimalType,
  VirtualCaretakerType,
} from "@prisma-app/client";
import { GetServerSidePropsContext } from "next";

export const PAGE_SIZE = 27;

type AnimalListArgs = {
  categories: AnimalCategory[];
  type?: AnimalType;
  vCaretakerType?: VirtualCaretakerType;
};

export function getAnimalListPageServerSideProps(
  pageId: string,
  args: AnimalListArgs,
) {
  return async function ({ query }: GetServerSidePropsContext) {
    const queryClient = new QueryClient();
    const queryParamPage = query.page as string;
    const initialPage =
      (Number.isNaN(parseInt(queryParamPage)) ? 1 : parseInt(queryParamPage)) -
      1;

    await Promise.all([
      queryClient.prefetchQuery(pageQueryOptions(pageId)),
      queryClient.prefetchQuery(
        animalsQueryOptions({
          ...args,
          skip: initialPage * PAGE_SIZE,
          take: PAGE_SIZE,
        }),
      ),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        initialPage,
      },
    };
  };
}

export async function getSimplePageServerSideProps(pageId: string) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(pageQueryOptions(pageId));

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export async function getGenericPageServerSideProps(
  context: GetServerSidePropsContext,
) {
  const queryClient = new QueryClient();
  const pageId = context.params?.id;
  if (!pageId) {
    throw Error("Invalid page id");
  }

  await queryClient.prefetchQuery(pageQueryOptions(pageId as string));

  return {
    props: {
      pageId,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export function getGonePageServerSideProps(
  mainPageId: string,
  poemPageId: string,
) {
  return async function ({ query }: GetServerSidePropsContext) {
    const queryClient = new QueryClient();
    const queryParamPage = query.page as string;
    const initialPage =
      (Number.isNaN(parseInt(queryParamPage)) ? 1 : parseInt(queryParamPage)) -
      1;

    await Promise.all([
      queryClient.prefetchQuery(pageQueryOptions(mainPageId)),
      queryClient.prefetchQuery(pageQueryOptions(poemPageId)),
      queryClient.prefetchQuery(
        animalsQueryOptions({
          categories: [AnimalCategory.ZaTeczowymMostem],
          skip: initialPage * PAGE_SIZE,
          take: PAGE_SIZE,
        }),
      ),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        initialPage,
      },
    };
  };
}

export async function getDogVolunteeringServerSideProps(pageId: string) {
  const queryClient = new QueryClient();

  await Promise.all([
    await queryClient.prefetchQuery(pageQueryOptions(pageId)),
    await queryClient.prefetchQuery(settingsQueryOptions()),
  ]);

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export async function getMainPageServerSideProps() {
  const queryClient = new QueryClient();
  const mainPageId = "glowna-adopcje";

  await Promise.all([
    queryClient.prefetchQuery(pageQueryOptions(mainPageId)),
    queryClient.prefetchQuery(recentNewsQueryOptions()),
    queryClient.prefetchQuery(afterAdoptionQueryOptions()),
  ]);

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export async function getNewsServerSideOptions({
  params,
}: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const newsId = params?.id;
  if (!newsId) {
    throw Error("Invalid news id");
  }

  await queryClient.prefetchQuery(newsQueryOptions(newsId as string));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      newsId,
    },
    revalidate: 60,
  };
}

export async function getAnimalDetailsServerSideProps({
  query,
}: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const animalId = query.id as string;

  await Promise.all([
    queryClient.prefetchQuery(animalDetailsQueryOptions(animalId)),
    queryClient.prefetchQuery(animalImagesQueryOptions(animalId)),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      animalId,
    },
  };
}
