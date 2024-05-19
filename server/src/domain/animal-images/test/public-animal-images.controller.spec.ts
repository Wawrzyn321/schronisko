import { Test, TestingModule } from '@nestjs/testing';
import { AnimalImage } from '@prisma-app/client';
import { PrismaService } from '../../../prisma-connect/prisma.service';
import { AnimalImagesPublicController } from '../animal-images.controller';
import { AnimalImagesService } from '../animal-images.service';

describe('AnimalImagesPublicController', () => {
  let animalImagesController: AnimalImagesPublicController;
  let animalImagesService: AnimalImagesService;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    animalImagesService = new AnimalImagesService(prismaServiceMock);
    animalImagesController = new AnimalImagesPublicController(
      animalImagesService,
    );
  });

  it('GET by invalid id returns a 404', async () => {
    prismaServiceMock.animal.findFirst = jest.fn(() => null);

    await expect(
      animalImagesController.getImages('some-id'),
    ).rejects.toThrowError(/Not Found/);
  });

  it('GET by id returns images, filtering public', async () => {
    const ANIMAL_ID = 'id-1';

    const mockAnimalImages: AnimalImage[] = [
      {
        id: '1',
        order: 1,
        animalId: ANIMAL_ID,
        imageName: 'img-name',
        visible: true,
      },
      {
        id: '3',
        order: 3,
        animalId: ANIMAL_ID,
        imageName: 'img-name',
        visible: true,
      },
    ];
    prismaServiceMock.animal.findFirst = jest
      .fn()
      .mockReturnValue('truthy-animal-mock');

    prismaServiceMock.animalImage.findMany = jest
      .fn()
      .mockReturnValue(mockAnimalImages);

    const result = await animalImagesController.getImages(ANIMAL_ID);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('3');
  });
});
