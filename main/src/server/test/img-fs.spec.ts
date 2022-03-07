import { WEB_STATIC_FILES_PATH } from '../app.module';
import {
  deleteImagesInContent,
  saveImagesFromContentModyfyingIt,
} from './../img-fs';

const mockUnlink = jest.fn();
const mockWriteFile = jest.fn();
jest.mock('fs', () => ({
  ...(jest.requireActual('fs') as object),
  promises: {
    ...jest.requireActual('fs').promises,
    unlink: (...args: any) => mockUnlink(...args),
    writeFile: (...args: any) => mockWriteFile(...args),
  },
}));

jest.mock('sharp', () => (buffer: Buffer) => ({
  resize: () => ({
    toBuffer: () =>
      Promise.resolve('mock file content ' + buffer.toString('base64')),
  }),
}));

describe('img-fs', () => {
  describe('deleteImagesInContent', () => {
    beforeEach(() => mockUnlink.mockRestore());

    it('Deletes all files if newContent is empty, replaces WEB_STATIC_FILES_PATH', async () => {
      const prevContent = `<img src="${WEB_STATIC_FILES_PATH}lala"><img src="lele">`;
      await deleteImagesInContent(prevContent);

      expect(mockUnlink).toHaveBeenNthCalledWith(
        1,
        'src/client/public/img/lala',
      );
      expect(mockUnlink).toHaveBeenNthCalledWith(
        2,
        'src/client/public/img/lele',
      );
    });

    it('Does not delete file if it exists in newContent', async () => {
      const prevContent = `<img src="${WEB_STATIC_FILES_PATH}lala"><img src="${WEB_STATIC_FILES_PATH}lele">`;
      const newContent = `<img src="${WEB_STATIC_FILES_PATH}lala"><img src="lele">`;

      await deleteImagesInContent(prevContent, newContent);

      expect(mockUnlink).toHaveBeenCalledTimes(1);
      expect(mockUnlink).toHaveBeenLastCalledWith('src/client/public/img/lele');
    });
  });

  describe('saveImagesFromContentModyfyingIt', () => {
    it('Saves the images and updates content', async () => {
      const prevContent = `<img src="${WEB_STATIC_FILES_PATH}lala"><img src="lele">`;
      const c = await saveImagesFromContentModyfyingIt(
        prevContent,
        [
          { name: 'name_lala', base64: 'base_lala' },
          { name: 'name_lele', base64: 'base_lele' },
        ],
        'subdir/',
      );

      expect(c).toMatch(
        `<img src="${WEB_STATIC_FILES_PATH}lala"><img src="lele">`,
      );

      expect(mockWriteFile).toHaveBeenCalledTimes(2);
      expect(mockWriteFile).toHaveBeenNthCalledWith(
        1,
        'src/client/public/img/subdir/subdir/name_lala',
        'mock file content base/lal',
      );
      expect(mockWriteFile).toHaveBeenNthCalledWith(
        2,
        'src/client/public/img/subdir/subdir/name_lele',
        'mock file content base/lel',
      );
    });
  });
});
