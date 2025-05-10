import { queryOptions } from "@tanstack/react-query";
import { fetchAfterAdoptionAnimals, fetchAnimal, fetchAnimalImages, fetchAnimals, FetchAnimalsArgs, fetchNews, fetchPage, fetchRecentNews, fetchSettings } from "./api";

const COMMON_OPTIONS = {
    staleTime: 60_1000,
    retry: false
}

export function pageQueryOptions(id: string) {
    return queryOptions({
        queryKey: ['pages', id],
        queryFn: () => fetchPage(id),
        ...COMMON_OPTIONS
    })
}

export function newsQueryOptions(id: string) {
    return queryOptions({
        queryKey: ['news', id],
        queryFn: () => fetchNews(id),
        ...COMMON_OPTIONS
    })
}

export function animalsQueryOptions(args: FetchAnimalsArgs) {
    // ensures even optional params are "at least null"
    // instead of not provided or "undefined"
    const defaultedArgs = {
        ...args,
        type: args.type ?? null,
        vCaretakerType: args.vCaretakerType ?? null,
    }
    return queryOptions({
        queryKey: ['animals', defaultedArgs],
        queryFn: () => fetchAnimals(defaultedArgs),
        ...COMMON_OPTIONS,
    })
}

export function settingsQueryOptions() {
    return queryOptions({
        queryKey: ['settings'],
        queryFn: fetchSettings,
        ...COMMON_OPTIONS,
    })
}

export function recentNewsQueryOptions() {
    return queryOptions({
        queryKey: ['recent-news'],
        queryFn: fetchRecentNews,
        ...COMMON_OPTIONS
    })
}

export function afterAdoptionQueryOptions() {
    return queryOptions({
        queryKey: ['after-adoption'],
        queryFn: fetchAfterAdoptionAnimals,
        ...COMMON_OPTIONS,
    })
}

export function animalDetailsQueryOptions(id: string) {
    return queryOptions({
        queryKey: ['animal', id],
        queryFn: () => fetchAnimal(id),
        ...COMMON_OPTIONS
    })
}

export function animalImagesQueryOptions(id: string) {
    return queryOptions({
        queryKey: ['animal-images', id],
        queryFn: () => fetchAnimalImages(id),
        ...COMMON_OPTIONS
    })
}