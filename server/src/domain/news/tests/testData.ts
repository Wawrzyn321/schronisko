import { LoggedInUser } from '../../auth/types';
import { allPermissions } from '../../auth/constants';
import { NewsCreateInput, NewsModifyParams, NewsUpdateInput } from '../News';
import { News, Settings } from '@prisma-app/client';

export const mockSetting: Settings = {
  id: 'KRS_NUMBER',
  value: 'SUBSTITUTED',
};

export const mockNewsWithSubstitution: News = {
  content: 'that is %KRS%',
  id: 'news-id',
  title: 'title',
  description: 'desc',
  isPublished: true,
  createdAt: new Date(),
  imageName: '',
};

export const mockAdminUser: LoggedInUser = {
  id: -1,
  login: 'test-user-login',
  permissions: allPermissions,
};

export const mockNews: News = {
  id: '15',
  title: 'test-news',
  description: 'test-desc',
  content: 'test-content',
  isPublished: false,
  createdAt: new Date(),
  imageName: 'test-img-name',
};

export const mockNewsCreate: NewsModifyParams<NewsCreateInput> = {
  news: {
    title: 'test-title',
    description: 'test-desc',
    isPublished: false,
    content: 'test-content',
    imageName: 'test-image-name',
  },
  images: [
    {
      base64: 'images_image-base-64',
      name: 'images_image-name',
    },
  ],
  imageData: 'test-image-data',
};

export const mockNewsUpdate: NewsModifyParams<NewsUpdateInput> = {
  news: {
    title: 'test-title',
    description: 'test-desc-2',
    isPublished: true,
    content: 'test-content',
    imageName: 'test-image-name-2',
    id: '15',
    imagePath: '/test-path',
  },
  images: [],
  imageData: 'test-image-data',
};
