import {
  validateVoluneeringFormFetch,
  validateVAdoptionFormFetch,
  VolunteeringFormFetch,
  VAdoptionFormFetch,
} from '../common';
import { AnimalType } from '@prisma-app/client';

const TEST_VOLUNTEERING_DATA: VolunteeringFormFetch = Object.freeze({
  about: 'about',
  fullName: 'fn',
  email: 'email',
  phoneNumber: '123',
  birthDate: 'now',
  captchaToken: 'test-token',
  animalType: AnimalType.CAT,
});

const TEST_ADOPTION_DATA: VAdoptionFormFetch = Object.freeze({
  fullName: 'fn',
  vCaretakerName: 'vn',
  email: 'email',
  additionalMessage: '',
  animalId: 'id',
  animalName: 'name',
  animalRefNo: 'ref',
  captchaToken: 'test-token',
});

describe('validateVoluneeringFormFetch', () => {
  it('returns true for valid data', () => {
    const data: VolunteeringFormFetch = TEST_VOLUNTEERING_DATA;
    expect(validateVoluneeringFormFetch(data)).toBe(true);
  });
  //todo invalid data test
});

describe('validateVAdoptionFormFetch', () => {
  it('returns true for valid data', () => {
    const data = TEST_ADOPTION_DATA;
    expect(validateVAdoptionFormFetch(data)).toBe(true);
  });

  //todo invalid data test
});
