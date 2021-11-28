import { FetchResult } from './api/api';
import { Animal, News, Page as PageModel } from '.prisma/client';

export type AfterAdoptionAnimal = Pick<Animal, 'id' | 'imageName' | 'name' | 'type'>;

export type NewsListElement = Pick<News, 'id' | 'description' | 'title' | 'createdAt' | 'isPublished' | 'imageName'>;

export type SSRContext = { query: { id: string } };

export type getStaticPropsProps = {
    params: {
        id: string;
    };
};

export type PageFetchFn = (id: string, isSSR?: boolean) => Promise<FetchResult<PageModel>>;

export type FormCaptcha = {
    id: string;
    text: string;
}

export type VolunteeringFormFetch = {
    fullName: string;
    email: string;
    telNumber: string;
    birthDate: string;
    about: string;
}

export type VAdoptionFormFetch = {
    fullName: string;
    vCaretakerName: string;
    email: string;
    additionalMessage: string;
    animalId: string;
    animalName: string;
    animalRefNo: string;
}

export type AnimalListResult = {
    animals: Animal[];
    totalCount: number;
}
