import { Test, TestingModule } from '@nestjs/testing';
import {
  Animal,
  AnimalCategory,
  AnimalGender,
  AnimalLocation,
  AnimalType,
  VirtualCaretakerType,
} from '@prisma/client';
import { AnimalImagesService } from '../../../domain/animal-images/animal-images.service';
import { LogsService } from '../../../domain/logs/logs.service';
import { PrismaService } from '../../../prisma-connect/prisma.service';
import { AnimalsPublicController } from '../animals.controller';
import { AnimalsService } from '../animals.service';

const makeAnimal = (id: string): Animal => ({
  addedDate: null,
  id,
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
  isPublic: false,
  imageName: '',
  note: '',
  contactInfo: '',
});

describe('AnimalsPublicController', () => {
  let animalController: AnimalsPublicController;
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
    animalController = new AnimalsPublicController(animalsService);
  });

  it('GET by invalid id / private animal id returns a 404', async () => {
    prismaServiceMock.animal.findFirst = jest
      .fn()
      .mockImplementation(({ where: { id, isPublic } }) => {
        expect(id).toBe('some-id');
        expect(isPublic).toBe(true);
        return null;
      });

    await expect(animalController.getAnimal('some-id')).rejects.toThrowError(
      /Not Found/,
    );
  });

  it('GET by id returns animal', async () => {
    const mockAnimal = makeAnimal('some-id');
    prismaServiceMock.animal.findFirst = jest
      .fn()
      .mockImplementation(({ where: { id, isPublic } }) => {
        expect(id).toBe('some-id');
        expect(isPublic).toBe(true);
        return mockAnimal;
      });

    const result = await animalController.getAnimal('some-id');
    expect(result).toBe(mockAnimal);
  });

  it('GET getAfterAdoptionAnimals with no invalid query returns 3 animals', async () => {
    const mockAnimals = [
      makeAnimal('1'),
      makeAnimal('2'),
      makeAnimal('3'),
      makeAnimal('4'),
    ];

    const findAnimalsMock = jest
      .fn()
      .mockImplementation(({ where: { category, isPublic } }) => {
        expect(category).toBe(AnimalCategory.ZnalazlyDom);
        expect(isPublic).toBe(true);
        return mockAnimals.splice(0, 3);
      });

    prismaServiceMock.animal.findMany = findAnimalsMock;

    const result = await animalController.getAfterAdoptionAnimals('bleh');
    expect(result.length).toBe(3);
    expect(findAnimalsMock).toHaveBeenCalled();
  });

  it('GET getAfterAdoptionAnimals returns min(availableAnimals, requestedAnimals)', async () => {
    const mockAnimals = [
      makeAnimal('1'),
      makeAnimal('2'),
      makeAnimal('3'),
      makeAnimal('4'),
      makeAnimal('5'),
      makeAnimal('6'),
    ];

    const findAnimalsMock = jest.fn().mockReturnValue(mockAnimals);

    prismaServiceMock.animal.findMany = findAnimalsMock;

    const result = await animalController.getAfterAdoptionAnimals('8');
    expect(result.length).toBe(6);
    expect(findAnimalsMock).toHaveBeenCalled();
  });

  it('GET getAnimalsPublic calls proper ORM query', async () => {
    const findAnimalsMock = jest.fn().mockReturnValue([{ animal: true }]);
    const countAnimalsMock = jest.fn().mockReturnValue(10);

    prismaServiceMock.animal.findMany = findAnimalsMock;
    prismaServiceMock.animal.count = countAnimalsMock;

    const result = await animalController.getAnimalsPublic(
      'ZnalazlyDom,Weterani',
      'CAT',
      VirtualCaretakerType.Szuka.toString(),
      '10',
      '20',
    );

    expect(result.animals).toStrictEqual([{ animal: true }]);
    expect(result.totalCount).toBe(10);
    expect(findAnimalsMock).toHaveBeenCalledWith({
      take: 20,
      skip: 10,
      where: {
        category: {
          in: ['ZnalazlyDom', 'Weterani'],
        },
        isPublic: true,
        type: 'CAT',
        virtualCaretakerType: 'Szuka',
      },
    });
    expect(countAnimalsMock).toHaveBeenCalled();
  });

  it('GET getAnimalsPublic with no proper params calls proper ORM query', async () => {
    const findAnimalsMock = jest.fn().mockReturnValue([{ animal: true }]);
    const countAnimalsMock = jest.fn().mockReturnValue(10);

    prismaServiceMock.animal.findMany = findAnimalsMock;
    prismaServiceMock.animal.count = countAnimalsMock;

    const result = await animalController.getAnimalsPublic(
      'a',
      'b',
      'c',
      'd',
      'e',
    );

    expect(result.animals).toStrictEqual([{ animal: true }]);
    expect(result.totalCount).toBe(10);
    expect(findAnimalsMock).toHaveBeenCalledWith({
      take: 27,
      skip: 0,
      where: {
        category: undefined,
        isPublic: true,
        type: undefined,
        virtualCaretakerType: undefined,
      },
    });
    expect(countAnimalsMock).toHaveBeenCalled();
  });
});
