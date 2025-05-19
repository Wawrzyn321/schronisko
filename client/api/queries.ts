import { AnimalListResult } from "./../types";
import { NewsListElement } from "types";
import { AnimalCategory, AnimalType, News } from "@prisma-app/client";
import {
  AnimalImage,
  Page as PageModel,
  Animal,
  VirtualCaretakerType,
  Settings,
} from "@prisma-app/client";
import { BACKEND_URL, getBackendUrl, SSR_BACKEND_URL } from "./config";
import { doFetch } from "./api";

export async function fetchAnimal(id: string): Promise<Animal> {
  const url = getBackendUrl() + "/api/c/animals/" + id;
  return doFetch(url);
}

export async function fetchAnimalImages(id: string): Promise<AnimalImage[]> {
  const url = BACKEND_URL + "/api/c/animal-images/" + id;
  return doFetch(url);
}

export async function fetchPage(id: string): Promise<PageModel> {
  const url = getBackendUrl() + "/api/c/pages/" + id;
  return doFetch(url);
}

export async function fetchPageIds(): Promise<string[]> {
  return await doFetch(SSR_BACKEND_URL + "/api/c/pages");
}

export async function fetchSettings(): Promise<Settings[]> {
  const url = getBackendUrl() + "/api/settings";
  return doFetch(url);
}

export type FetchAnimalsArgs = {
  categories: AnimalCategory[];
  vCaretakerType?: VirtualCaretakerType | null;
  type?: AnimalType | null;
  skip: number;
  take: number;
};

export async function fetchAnimals({
  categories = [],
  type = null,
  vCaretakerType = null,
  skip,
  take,
}: FetchAnimalsArgs): Promise<AnimalListResult> {
  const params = new URLSearchParams({
    categories: categories.join(","),
    vCaretakerType: vCaretakerType as string,
    type: type as string,
    skip: skip.toString(),
    take: take.toString(),
  }).toString();

  return doFetch(`${BACKEND_URL}/api/c/animals?${params}`);
}

export async function fetchAfterAdoptionAnimals(): Promise<Animal[]> {
  const url = getBackendUrl() + "/api/c/animals/after-adoption?count=3";
  return doFetch(url);
}

export async function fetchNews(id: string): Promise<News> {
  const url = getBackendUrl() + "/api/c/news/" + id;
  return doFetch(url);
}

export async function fetchRecentNews(): Promise<NewsListElement[]> {
  const url = getBackendUrl() + "/api/c/news/recent?count=5";
  return doFetch(url);
}
