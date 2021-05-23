export interface NewsCreateParams {
    title: string;
    description: string;
    isPublished: boolean;
    content: string;
    imageName: string;
}

export interface NewsListElement {
    id: string;
    description: string;
    title: string;
    createdAt: Date;
    isPublished: boolean;
}
