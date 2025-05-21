import { LoggedInUser } from '../../auth/types';
import { allPermissions } from '../../auth/constants';
import { ImageData } from '../../fs/types';
import { Page } from '@prisma-app/client';

export const mockAdminUser: LoggedInUser = {
  id: -1,
  login: 'test-user-login',
  permissions: allPermissions,
};

export const mockPage: Page = {
  id: '12',
  title: 'page-title',
  content: 'page-content',
};

export const body: { page: Page; images: ImageData[] } = {
  page: { id: '12', title: 'page-title-2', content: 'page-content-2' },
  images: [{ name: 'mock-image-name', base64: 'mock-base-64' }],
};
