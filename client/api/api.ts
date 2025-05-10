import {
  AnimalListResult,
  VolunteeringFormFetch,
  VAdoptionFormFetch,
} from "./../types";
import { NewsListElement } from "types";
import { AnimalCategory, AnimalType, News } from "@prisma-app/client";
import {
  AnimalImage,
  Page as PageModel,
  Animal,
  VirtualCaretakerType,
  Settings,
} from "@prisma-app/client";
import { BACKEND_URL, getBackendUrl, isSSR, SSR_BACKEND_URL } from "./config";

export class FetchError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

async function doFetch(
  input: string,
  init: RequestInit = null,
): Promise<any> {
  function createRequestOptions(): RequestInit {
    if (input.startsWith("http://")) {
      return null;
    }
    if (isSSR()) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Agent = (require("https") as any).Agent;
      return {
        agent: new Agent({ rejectUnauthorized: true }),
      } as RequestInit;
    }
    return null;
  }

  const response = await fetch(input, { ...init, ...createRequestOptions() });
  if (response.ok) {
    if (response.headers.get("content-type")?.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  }
  const error = await response.json();
  throw new FetchError(error.message, error.statusCode);
}

async function doPost(url: string, body: unknown) {
  return await doFetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

export async function fetchAnimal(id: string): Promise<Animal> {
  const url = getBackendUrl() + "/api/c/animals/" + id;
  return doFetch(url);
}

export async function fetchAnimalImages(
  id: string,
): Promise<AnimalImage[]> {
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
  vCaretakerType?: VirtualCaretakerType;
  type?: AnimalType;
  skip: number;
  take: number;
}

export async function fetchAnimals({
  categories = [],
  type,
  vCaretakerType,
  skip,
  take,
}: FetchAnimalsArgs): Promise<AnimalListResult> {
  const params = new URLSearchParams({
    categories: categories.join(","),
    vCaretakerType,
    type,
    skip: skip.toString(),
    take: take.toString(),
  }).toString()

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

export async function fetchVolunteeringForm(
  props: VolunteeringFormFetch,
): Promise<void> {
  const url = BACKEND_URL + "/api/comms/volunteer";
  return doPost(url, props);
}

export async function fetchVAdoptionForm(
  props: VAdoptionFormFetch,
): Promise<void> {
  const url = BACKEND_URL + "/api/comms/v-adoption?";
  return doPost(url, props);
}
