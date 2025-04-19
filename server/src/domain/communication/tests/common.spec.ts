import {
  validateVoluneeringFormFetch,
  validateVAdoptionFormFetch,
  VolunteeringFormFetch,
  VAdoptionFormFetch,
} from '../common';

function makeVolunteeringData(): VolunteeringFormFetch {
  return {
    about: 'about',
    fullName: 'fn',
    email: 'email',
    telNumber: '123',
    birthDate: 'now',
    captchaToken: 'test-token',
  };
}

function makeVAdoptionData(): VAdoptionFormFetch {
  return {
    fullName: 'fn',
    vCaretakerName: 'vn',
    email: 'email',
    additionalMessage: '',
    animalId: 'id',
    animalName: 'name',
    animalRefNo: 'ref',
    captchaToken: 'test-token',
  };
}

describe('validateVoluneeringFormFetch', () => {
  it('returns true for valid data', () => {
    const data: VolunteeringFormFetch = makeVolunteeringData();
    expect(validateVoluneeringFormFetch(data)).toBe(true);
  });

  for (const key of Object.keys(makeVolunteeringData())) {
    it('returns false for invalid data: ' + key, () => {
      const data: VolunteeringFormFetch = makeVolunteeringData();
      data[key] = '';
      expect(validateVoluneeringFormFetch(data)).toBe(false);
    });
  }
});

describe('validateVAdoptionFormFetch', () => {
  it('returns true for valid data', () => {
    const data = makeVAdoptionData();
    expect(validateVAdoptionFormFetch(data)).toBe(true);
  });

  for (const key of Object.keys(makeVAdoptionData())) {
    // additionalMessage is not required
    if (key === 'additionalMessage') continue;
    it('returns false for invalid data: ' + key, () => {
      const data = makeVAdoptionData();
      data[key] = '';
      expect(validateVAdoptionFormFetch(data)).toBe(false);
    });
  }
});
