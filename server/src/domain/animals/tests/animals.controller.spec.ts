import { Test, TestingModule } from '@nestjs/testing';
import {
  Animal,
  AnimalCategory,
  AnimalGender,
  AnimalLocation,
  AnimalType,
  Permission,
  VirtualCaretakerType,
} from '@prisma-app/client';
import { AnimalImagesService } from '../../animal-images/animal-images.service';
import { LogsService } from '../../logs/logs.service';
import { PrismaService } from '../../../prisma-connect/prisma.service';
import { AnimalsController } from '../animals.controller';
import { AnimalData, AnimalsService } from '../animals.service';
import { LoggedInUser } from '../../auth/types';
import { allPermissions } from '../../auth/constants';

const mockAdminUser: LoggedInUser = {
  id: -1,
  login: 'test-user-login',
  permissions: allPermissions,
};

const mockAnimal: Animal = {
  addedAt: new Date(),
  modifiedAt: new Date(),
  id: 'id',
  refNo: 'ref',
  name: 'name',
  type: AnimalType.CAT,
  gender: AnimalGender.MALE,
  description: 'decs',
  category: AnimalCategory.DoAdopcji,
  location: AnimalLocation.Schronisko,
  locationDescription: 'location-desc',
  virtualCaretakerType: VirtualCaretakerType.NiePrzypisany,
  virtualCaretakerName: '',
  isPublic: true,
  imageName: 'img-name',
  note: '',
  contactInfo: '',
};

const animalData: AnimalData = {
  id: 'id',
  refNo: 'ref',
  name: 'name',
  type: AnimalType.CAT,
  gender: AnimalGender.MALE,
  description: 'decs',
  category: AnimalCategory.DoAdopcji,
  location: AnimalLocation.Schronisko,
  locationDescription: 'location-desc',
  virtualCaretakerType: VirtualCaretakerType.NiePrzypisany,
  isPublic: true,
  imageName: 'img-name',
  contactInfo: '',
  virtualCaretakerName: '',
};

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

describe('AnimalsController', () => {
  let animalController: AnimalsController;
  let animalsService: AnimalsService;
  let prismaServiceMock: PrismaService;
  let animalImagesService: AnimalImagesService;
  let logsService: LogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    logsService = new LogsService(prismaServiceMock);
    animalImagesService = new AnimalImagesService(prismaServiceMock);
    animalsService = new AnimalsService(
      prismaServiceMock,
      logsService,
      animalImagesService,
    );
    animalController = new AnimalsController(animalsService);
  });

  it('GET returns all animals (default params)', async () => {
    prismaServiceMock.animal.findMany = jest.fn().mockReturnValue([mockAnimal]);

    const result = await animalController.getAnimals('blah', 'bleh');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { description, ...animalListElement } = mockAnimal;
    expect(result).toMatchObject([animalListElement]);
    expect(prismaServiceMock.animal.findMany).toHaveBeenCalledWith({
      skip: undefined,
      take: undefined,
      where: {
        category: undefined,
        isPublic: undefined,
        type: undefined,
        virtualCaretakerType: undefined,
      },
    });
  });

  it('GET returns all animals (custom params)', async () => {
    prismaServiceMock.animal.findMany = jest.fn().mockReturnValue([mockAnimal]);

    const result = await animalController.getAnimals('15', '17');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { description, ...animalListElement } = mockAnimal;
    expect(result).toMatchObject([animalListElement]);
    expect(prismaServiceMock.animal.findMany).toHaveBeenCalledWith({
      skip: 17,
      take: 15,
      where: {
        category: undefined,
        isPublic: undefined,
        type: undefined,
        virtualCaretakerType: undefined,
      },
    });
  });

  it('GET single returns animal', async () => {
    prismaServiceMock.animal.findFirst = jest.fn().mockReturnValue(mockAnimal);

    const result = await animalController.getAnimal('id');

    expect(result).toMatchObject(mockAnimal);
    expect(prismaServiceMock.animal.findFirst).toHaveBeenCalledWith({
      where: { id: 'id', isPublic: undefined },
    });
  });

  it('GET throws 404 on Not Found', async () => {
    prismaServiceMock.animal.findFirst = jest.fn().mockReturnValue(null);

    await expect(animalController.getAnimal('id')).rejects.toThrow('Not Found');
  });

  it('POST fails on invalid animal data - 1', async () => {
    await expect(
      animalController.addAnimal(
        { ...animalData, name: '' },
        { user: mockAdminUser },
      ),
    ).rejects.toThrow('Brak nazwy lub numeru referencyjnego.');
  });

  it('POST fails on invalid animal data - 2', async () => {
    await expect(
      animalController.addAnimal(
        { ...animalData, virtualCaretakerType: VirtualCaretakerType.Znalazl },
        { user: mockAdminUser },
      ),
    ).rejects.toThrow('Brak nazwy wirtualnego opiekuna.');
  });

  it('POST throws 405 on conflict', async () => {
    prismaServiceMock.animal.findUnique = jest.fn().mockReturnValue(mockAnimal);

    await expect(
      animalController.addAnimal(animalData, { user: mockAdminUser }),
    ).rejects.toThrow('Conflict Exception');

    expect(prismaServiceMock.animal.findUnique).toHaveBeenLastCalledWith({
      where: { id: 'id' },
    });
  });

  it('POST creates animal - without creating image', async () => {
    mockWriteFile.mockReset();
    prismaServiceMock.animal.findUnique = jest.fn().mockReturnValue(null);
    prismaServiceMock.animal.create = jest.fn().mockReturnValue(mockAnimal);
    const logMock = jest.fn();
    logsService.log = logMock;

    const result = await animalController.addAnimal(animalData, {
      user: mockAdminUser,
    });

    expect(result).toMatchObject(mockAnimal);
    expect(mockWriteFile).not.toHaveBeenCalled();
    expect(prismaServiceMock.animal.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        ...animalData,
        imageName: null,
        id: expect.any(String),
      }),
    });
    expect(logMock).toHaveBeenCalledWith({
      message: expect.any(String),
      permission: Permission.ANIMAL,
      user: mockAdminUser,
    });
    expect(logMock.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"dodał zwierzę name"`,
    );
  });

  it('POST creates animal - with creating image', async () => {
    mockWriteFile.mockReset();
    prismaServiceMock.animal.findUnique = jest.fn().mockReturnValue(null);
    prismaServiceMock.animal.create = jest.fn().mockReturnValue(mockAnimal);
    const logMock = jest.fn();
    logsService.log = logMock;

    await animalController.addAnimal(
      { ...animalData, imageData: 'data!' },
      {
        user: mockAdminUser,
      },
    );

    expect(mockWriteFile).toHaveBeenCalledWith(
      expect.stringContaining('/img/animals/'),
      expect.stringContaining('mock file content'),
    );
  });

  it('PATCH fails on invalid animal data - 1', async () => {
    await expect(
      animalController.updateAnimal(
        'id',
        { ...animalData, name: '' },
        { user: mockAdminUser },
      ),
    ).rejects.toThrow('Brak nazwy lub numeru referencyjnego.');
  });

  it('PATCH fails on invalid animal data - 2', async () => {
    await expect(
      animalController.updateAnimal(
        'id',
        { ...animalData, virtualCaretakerType: VirtualCaretakerType.Znalazl },
        { user: mockAdminUser },
      ),
    ).rejects.toThrow('Brak nazwy wirtualnego opiekuna.');
  });

  it('PATCH fails on invalid id - not found', async () => {
    prismaServiceMock.animal.findUnique = jest.fn().mockReturnValue(null);

    await expect(
      animalController.updateAnimal('id', animalData, { user: mockAdminUser }),
    ).rejects.toThrow('Not Found');

    expect(prismaServiceMock.animal.findUnique).toHaveBeenCalledWith({
      where: { id: 'id' },
    });
  });

  it('PATCH fails on id mismatch', async () => {
    prismaServiceMock.animal.findUnique = jest.fn().mockReturnValue({});

    await expect(
      animalController.updateAnimal('id-2', animalData, {
        user: mockAdminUser,
      }),
    ).rejects.toThrow('Identyfikator musi się zgadzać.');
  });

  it('PATCH updates animal', async () => {
    prismaServiceMock.animal.findUnique = jest.fn().mockReturnValue(mockAnimal);
    prismaServiceMock.animal.update = jest.fn().mockReturnValue(mockAnimal);
    const logMock = jest.fn();
    logsService.log = logMock;

    const result = await animalController.updateAnimal('id', animalData, {
      user: mockAdminUser,
    });

    expect(result).toBe(mockAnimal);
    expect(logMock).toHaveBeenCalledWith({
      message: expect.any(String),
      permission: Permission.ANIMAL,
      user: mockAdminUser,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { note, addedAt, ...data } = mockAnimal;
    expect(prismaServiceMock.animal.update).toHaveBeenCalledWith({
      where: { id: 'id' },
      data: { ...data, modifiedAt: expect.any(Date) },
    });
    expect(logMock.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"zaktualizował zwierzę name (id id, nr ref) (Notatka)"`,
    );
  });

  it('PATCH updates animal - moving to readonly deletes pictures', async () => {
    prismaServiceMock.animal.findUnique = jest.fn().mockReturnValue(mockAnimal);
    prismaServiceMock.animal.update = jest.fn().mockReturnValue(mockAnimal);
    logsService.log = jest.fn();
    animalImagesService.deleteByAnimal = jest.fn();

    await animalController.updateAnimal(
      'id',
      { ...animalData, category: AnimalCategory.ZaTeczowymMostem },
      {
        user: mockAdminUser,
      },
    );

    expect(animalImagesService.deleteByAnimal).toHaveBeenCalledWith(
      mockAnimal.id,
    );
  });

  it('DELETE deletes animal data', async () => {
    mockUnlink.mockReset();
    prismaServiceMock.animal.findFirst = jest.fn().mockReturnValue(mockAnimal);
    animalImagesService.deleteByAnimal = jest.fn();
    prismaServiceMock.animal.delete = jest.fn().mockReturnValue(mockAnimal);
    const logMock = jest.fn();
    logsService.log = logMock;

    const result = await animalController.deleteAnimal('id', {
      user: mockAdminUser,
    });

    expect(result).toMatchObject(mockAnimal);
    expect(animalImagesService.deleteByAnimal).toHaveBeenCalledWith('id');
    expect(mockUnlink).toHaveBeenCalledWith(
      expect.stringContaining('/img/animals/img-name'),
    );
    expect(prismaServiceMock.animal.findFirst).toHaveBeenCalledWith({
      where: { id: 'id' },
    });
    expect(prismaServiceMock.animal.delete).toHaveBeenCalledWith({
      where: { id: 'id' },
    });
    expect(logMock).toHaveBeenCalledWith({
      message: expect.any(String),
      permission: Permission.ANIMAL,
      user: mockAdminUser,
    });
    expect(logMock.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"usunał zwierzę name"`,
    );
  });

  it('DELETE logs if image could not be deleted', async () => {
    const warnMock = jest.fn();
    console.warn = warnMock;
    mockUnlink.mockReset();
    mockUnlink.mockImplementation(() => {
      throw 'BRZYDKO';
    });
    prismaServiceMock.animal.findFirst = jest.fn().mockReturnValue(mockAnimal);
    animalImagesService.deleteByAnimal = jest.fn();
    prismaServiceMock.animal.delete = jest.fn().mockReturnValue(mockAnimal);
    const logMock = jest.fn();
    logsService.log = logMock;

    const result = await animalController.deleteAnimal('id', {
      user: mockAdminUser,
    });

    expect(result).toMatchObject(mockAnimal);
    expect(logMock).toHaveBeenCalledWith({
      message: expect.any(String),
      permission: Permission.ANIMAL,
      user: mockAdminUser,
    });
    expect(logMock.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"usunał zwierzę name, ale nie udało się usunąć jego zdjęcia."`,
    );
    warnMock.mockRestore();
  });
});
