export interface NewsCreateParams {
    title: string;
    isPublished: boolean;
    content: string;
}

export interface NewsListElement {
    id: string;
    title: string;
    createdAt: Date;
    isPublished: boolean;
}

export interface News extends NewsListElement {
    content: string;
}
