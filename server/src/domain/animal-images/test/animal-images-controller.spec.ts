import { Test, TestingModule } from '@nestjs/testing';
import { AnimalImage } from '@prisma-app/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AnimalImagesController } from '../animal-images.controller';
import { AnimalImagesService, UpsertParams } from '../animal-images.service';
import { FsServiceInterface } from '../../fs/interface';
import { FsServiceMock } from '../../../util/testData';
import { mockImage } from './testData';

const mockUnlink = jest.fn();
const mockWriteFile = jest.fn();
jest.mock('fs', () => ({
  existsSync: jest.fn(() => true),
  // needed for Prisma
  readFileSync: jest.requireActual('fs').readFileSync,
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

describe('AnimalImagesController', () => {
  let animalImagesController: AnimalImagesController;
  let animalImagesService: AnimalImagesService;
  let prismaServiceMock: PrismaService;
  let fsService: FsServiceInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    fsService = new FsServiceMock();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    animalImagesService = new AnimalImagesService(prismaServiceMock, fsService);
    animalImagesController = new AnimalImagesController(animalImagesService);
  });

  it('GET returns a 404 if animal with given id is not found', async () => {
    prismaServiceMock.animal.findFirst = jest.fn().mockReturnValue(null);

    await expect(
      animalImagesController.getImages('some-id'),
    ).rejects.toThrowError(/Not Found/);
    expect(prismaServiceMock.animal.findFirst).toHaveBeenCalledWith({
      where: { id: 'some-id', onlyPublic: undefined },
    });
  });

  it('GET returns animal images', async () => {
    prismaServiceMock.animal.findFirst = jest.fn().mockReturnValue(true);
    prismaServiceMock.animalImage.findMany = jest
      .fn()
      .mockReturnValue('animal-images');

    const result = await animalImagesController.getImages('some-id');
    expect(result).toBe('animal-images');
    expect(prismaServiceMock.animalImage.findMany).toHaveBeenCalledWith({
      where: { animalId: 'some-id', onlyPublic: undefined },
    });
  });

  it('PUT throws when images count is greater than 8', async () => {
    const imagesX8: UpsertParams[] = Array(8)
      .fill(() => 0)
      .map(() => ({
        data: 'img-data',
        order: 0,
        visible: true,
        id: 'id',
        animalId: 'aId',
        imageName: 'name',
      }));

    await expect(
      animalImagesController.upsertImages('some-id', imagesX8),
    ).rejects.toThrowError('Bad Request Exception');
  });

  it('PUT throws when image of given id does not exist', async () => {
    const mockUpsertParams: UpsertParams[] = [
      {
        data: 'img-data',
        order: 0,
        visible: true,
        id: 'some-id',
        animalId: 'aId',
        imageName: 'name',
      },
    ];

    prismaServiceMock.animal.findFirst = jest.fn().mockReturnValue(null);

    await expect(
      animalImagesController.upsertImages('some-id', mockUpsertParams),
    ).rejects.toThrowError('Not Found');
    expect(prismaServiceMock.animal.findFirst).toHaveBeenCalledWith({
      where: { id: 'some-id', isPublic: undefined },
    });
  });

  it('PUT upserts image', async () => {
    const mockUpsertParams: UpsertParams[] = [
      {
        data: 'img-data',
        order: 0,
        visible: true,
        id: 'some-id',
        animalId: 'aId',
        imageName: 'image-name',
      },
      {
        data: 'img-data-2',
        order: 1,
        visible: false,
        id: 'some-id-2',
        animalId: 'aId',
      },
    ];
    const mockExistingImages: AnimalImage[] = [
      {
        id: 'img-id',
        order: 10,
        animalId: 'aId',
        imageName: 'image-name',
        visible: true,
      },
    ];

    prismaServiceMock.animal.findFirst = jest.fn().mockReturnValue(true);
    prismaServiceMock.animalImage.findMany = jest
      .fn()
      .mockReturnValue(mockExistingImages);
    prismaServiceMock.animalImage.create = jest.fn();

    await animalImagesController.upsertImages(
      mockExistingImages[0].animalId,
      mockUpsertParams,
    );

    expect(prismaServiceMock.animal.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'aId',
        isPublic: undefined,
      },
    });
    expect(prismaServiceMock.animalImage.findMany).toHaveBeenCalledWith({
      where: { animalId: 'aId' },
    });
    expect(prismaServiceMock.animalImage.create).toHaveBeenCalledWith({
      data: {
        animalId: 'aId',
        id: 'some-id-2',
        imageName: expect.stringContaining('.png'),
        order: 1,
        visible: false,
      },
    });
  });

  it("DELETE throws if animalId doesn't match anything", async () => {
    prismaServiceMock.animal.findFirst = jest.fn().mockReturnValue(null);

    await expect(
      animalImagesController.deleteImages('some-id'),
    ).rejects.toThrowError(/Not Found/);
  });

  it('DELETE deletes images', async () => {
    prismaServiceMock.animal.findFirst = jest.fn().mockReturnValue(true);
    prismaServiceMock.animalImage.findMany = jest
      .fn()
      .mockReturnValue([mockImage]);
    prismaServiceMock.animalImage.deleteMany = jest.fn();

    await animalImagesController.deleteImages('some-id');
    expect(prismaServiceMock.animalImage.findMany).toHaveBeenCalledWith({
      where: { animalId: 'some-id' },
    });
    expect(prismaServiceMock.animalImage.deleteMany).toHaveBeenCalledWith({
      where: { animalId: 'some-id' },
    });
  });
});
