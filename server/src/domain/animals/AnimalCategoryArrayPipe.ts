import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { AnimalCategory } from '@prisma-app/client';

const KEYS = Object.keys(AnimalCategory);

@Injectable()
export class AnimalCategoryArrayPipe implements PipeTransform {
  transform(value: unknown) {
    if (typeof value !== 'string') {
      throw new BadRequestException(null, 'string array is expected');
    }
    return value
      .split('')
      .map((category) => getFromEnum<AnimalCategory>(category, KEYS))
      .filter(Boolean);
  }
}
function getFromEnum<T>(possibleT: string, keys: string[]): T | undefined {
  if (keys.includes(possibleT)) {
    return possibleT as unknown as T;
  } else {
    return undefined;
  }
}
