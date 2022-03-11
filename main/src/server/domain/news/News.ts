import { ImageData } from 'img-fs';

export type NewsCreateInput = {
  title: string;
  description: string;
  isPublished: boolean;
  content: string;
  imageName: string;
};

export interface NewsUpdateInput extends NewsCreateInput {
  id: string;
  imagePath: string;
}

export interface NewsModifyParams<TNewsInput> {
  news: TNewsInput;
  images: ImageData[];
  imageData: string;
}

export type NewsListElement = {
  id: string;
  description: string;
  title: string;
  createdAt: Date;
  isPublished: boolean;
  imageName: string;
};
