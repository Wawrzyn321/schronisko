export interface NewsCreateInput {
    title: string;
    description: string;
    isPublished: boolean;
    content: string;
    imageName: string;
}

export interface NewsUpdateInput extends NewsCreateInput {
    id: string;
    imagePath: string;
}

export interface NewsModifyParams<TNewsInput> {
    news: TNewsInput;
    imageData: string;
}

export interface NewsListElement {
    id: string;
    description: string;
    title: string;
    createdAt: Date;
    isPublished: boolean;
}