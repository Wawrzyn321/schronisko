import { Test, TestingModule } from '@nestjs/testing';
import {
  Animal,
  AnimalCategory,
  AnimalGender,
  AnimalLocation,
  AnimalType,
  VirtualCaretakerType,
} from '@prisma-app/client';
import { AnimalImagesService } from '../../animal-images/animal-images.service';
import { LogsService } from '../../logs/logs.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AnimalsPublicController } from '../animals.controller';
import { AnimalsService } from '../animals.service';
import { FsServiceMock } from '../../../util/testData';
import { FsServiceInterface } from '../../fs/interface';

const makeAnimal = (id: string): Animal => ({
  addedAt: new Date(),
  modifiedAt: new Date(),
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
  let fsService: FsServiceInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    logsService = new LogsService(prismaServiceMock);
    animalImagesService = new AnimalImagesService(prismaServiceMock, fsService);
    fsService = new FsServiceMock();
    animalsService = new AnimalsService(
      prismaServiceMock,
      logsService,
      animalImagesService,
      fsService,
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

    const result = await animalController.getAfterAdoptionAnimals();
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

    const result = await animalController.getAfterAdoptionAnimals(8);
    expect(result.length).toBe(6);
    expect(findAnimalsMock).toHaveBeenCalled();
  });

  it('GET getAnimalsPublic calls proper ORM query', async () => {
    const findAnimalsMock = jest.fn().mockReturnValue([{ animal: true }]);
    const countAnimalsMock = jest.fn().mockReturnValue(10);

    prismaServiceMock.animal.findMany = findAnimalsMock;
    prismaServiceMock.animal.count = countAnimalsMock;

    const result = await animalController.getAnimalsPublic(
      [AnimalCategory.ZnalazlyDom, AnimalCategory.Weterani],
      AnimalType.CAT,
      VirtualCaretakerType.Szuka,
      10,
      20,
    );

    expect(result.animals).toEqual([{ animal: true }]);
    expect(result.totalCount).toBe(10);
    expect(findAnimalsMock).toHaveBeenCalledWith({
      take: 20,
      skip: 10,
      where: {
        category: {
          in: [AnimalCategory.ZnalazlyDom, AnimalCategory.Weterani],
        },
        isPublic: true,
        type: AnimalType.CAT,
        virtualCaretakerType: VirtualCaretakerType.Szuka,
      },
    });
    expect(countAnimalsMock).toHaveBeenCalled();
  });
});
