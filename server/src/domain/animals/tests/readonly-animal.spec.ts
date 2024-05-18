import { AnimalCategory } from '@prisma/client';
import { changedToReadonly } from '../readonly-animal';

describe('changedToReadonly', () => {
  const cases: [AnimalCategory, AnimalCategory, boolean][] = [
    [AnimalCategory.ZaTeczowymMostem, AnimalCategory.ZaTeczowymMostem, false],
    [AnimalCategory.ZnalazlyDom, AnimalCategory.ZnalazlyDom, false],
    [AnimalCategory.DoAdopcji, AnimalCategory.DoAdopcji, false],
    [AnimalCategory.ZaTeczowymMostem, AnimalCategory.ZnalazlyDom, false],
    [AnimalCategory.ZnalazlyDom, AnimalCategory.ZaTeczowymMostem, false],
    [AnimalCategory.ZnalazlyDom, AnimalCategory.DoAdopcji, true],
    [AnimalCategory.ZaTeczowymMostem, AnimalCategory.DoAdopcji, true],
    [AnimalCategory.DoAdopcji, AnimalCategory.Weterani, false],
  ];
  test.each(cases)(
    '%p <- %p, returns %p',
    (
      category: AnimalCategory,
      prevCategory: AnimalCategory,
      hasChanged: boolean,
    ) => {
      const result = changedToReadonly(category, prevCategory);
      expect(result).toEqual(hasChanged);
    },
  );
});
