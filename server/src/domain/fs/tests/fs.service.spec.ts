import { FsService } from '../fs.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CONFIG_SERVICE_MOCK } from '../../../util/testData';

const mockUnlink = jest.fn();
const mockWriteFile = jest.fn();
jest.mock('fs', () => ({
  promises: {
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

const MOCK_WEB_STATIC_FILES_PATH = '<webStaticFilesPath>';

describe('FsService', () => {
  let fsService: FsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FsService, CONFIG_SERVICE_MOCK],
    }).compile();
    fsService = module.get<FsService>(FsService);
  });

  it('deleteImage unlinks image', async () => {
    await fsService.deleteImage('/subdir', 'fileName');

    expect(mockUnlink).toHaveBeenCalledWith(
      '<localStaticFilesPath>/img/subdir/fileName',
    );
  });

  it('saveImage saves image to proper directory', async () => {
    await fsService.saveImage({
      subdir: '/subdirectory',
      name: 'file-name.png',
      base64Data: 'base64-data',
      resizingPreset: 'Animal Gallery',
    });

    expect(mockWriteFile).toHaveBeenCalledWith(
      '<localStaticFilesPath>/img/subdirectory/file-name.png',
      'mock file content base64+datY=',
    );
  });

  describe('deleteImagesInContent', () => {
    beforeEach(() => mockUnlink.mockRestore());

    it('Deletes all files if newContent is empty, replaces WEB_STATIC_FILES_PATH', async () => {
      const prevContent = `<img src="${MOCK_WEB_STATIC_FILES_PATH}content1"><img src="content2">`;
      await fsService.deleteImagesInContent(prevContent);

      expect(mockUnlink).toHaveBeenNthCalledWith(
        1,
        '<localStaticFilesPath>/img/content1',
      );
      expect(mockUnlink).toHaveBeenNthCalledWith(
        2,
        '<localStaticFilesPath>/img/content2',
      );
    });

    it('Does not delete file if it exists in newContent', async () => {
      const prevContent = `<img src="${MOCK_WEB_STATIC_FILES_PATH}content1"><img src="${MOCK_WEB_STATIC_FILES_PATH}content2">`;
      const newContent = `<img src="${MOCK_WEB_STATIC_FILES_PATH}content1"><img src="content2">`;

      await fsService.deleteImagesInContent(prevContent, newContent);

      expect(mockUnlink).toHaveBeenCalledTimes(1);
      expect(mockUnlink).toHaveBeenLastCalledWith(
        '<localStaticFilesPath>/img/content2',
      );
    });
  });

  it('saveImagesFromContentModyfyingIt saves the images and updates content', async () => {
    mockWriteFile.mockRestore();
    const prevContent = `<img src="${MOCK_WEB_STATIC_FILES_PATH}/1"><img src="2">`;
    const result = await fsService.saveImagesFromContentModyfyingIt(
      prevContent,
      [
        { name: 'name_1', base64: 'base_1' },
        { name: 'name_2', base64: 'base_2' },
      ],
      'subdir',
    );

    expect(result).toEqual(
      `<img src="${MOCK_WEB_STATIC_FILES_PATH}/1"><img src="2">`,
    );

    expect(mockWriteFile).toHaveBeenCalledTimes(2);
    expect(mockWriteFile).toHaveBeenNthCalledWith(
      1,
      '<localStaticFilesPath>/img/subdir/name_1',
      'mock file content base/w==',
    );
    expect(mockWriteFile).toHaveBeenNthCalledWith(
      2,
      '<localStaticFilesPath>/img/subdir/name_2',
      'mock file content base/w==',
    );
  });
});
