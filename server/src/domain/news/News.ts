import { ImageData } from '../../util/img-fs';
import type { News } from '@prisma-app/client';

export type NewsCreateInput = Omit<News, 'id' | 'createdAt'>;

export type NewsUpdateInput = NewsCreateInput & {
  id: string;
  imagePath: string;
};

export interface NewsModifyParams<TNewsInput> {
  news: TNewsInput;
  images: ImageData[];
  imageData: string;
}

export type NewsListElement = Omit<News, 'content'>;
