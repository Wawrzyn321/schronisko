import { Permission } from '@prisma-app/client';
import { allPermissions } from '../../auth/constants';
import {
  toPrismaUserCreate,
  validateCreate,
  validateSelfUpdate,
  validateOtherUserUpdate,
  FrontendUserCreateDto,
  FrontendUpdateOtherUserDto,
  FrontendSelfUpdateDto,
} from '../types';

function makeFrontendCreateDto(): FrontendUserCreateDto {
  return {
    login: 'login',
    firstName: 'fn',
    lastName: 'ln',
    password: 'pass',
    permissions: [Permission.ANIMAL],
  };
}

function makeFrontendSelfUpdateDto(): FrontendSelfUpdateDto {
  return { login: 'login', firstName: 'fn', lastName: 'ln' };
}

describe('toPrismaUserCreate', () => {
  it('converts FrontendUserCreateDto to db friendly format', async () => {
    const user: FrontendUserCreateDto = {
      login: 'login',
      firstName: 'fn',
      lastName: 'ln',
      password: 'pass',
      permissions: [Permission.ANIMAL, Permission.USER],
    };

    const fakeHasher = jest.fn(() => 'hash');

    const result = toPrismaUserCreate(user, fakeHasher);

    expect(fakeHasher).toHaveBeenCalledWith(user.password);
    expect(result).toMatchInlineSnapshot(`
{
  "firstName": "fn",
  "isActive": true,
  "lastName": "ln",
  "login": "login",
  "passwordHash": "hash",
  "permissions": {
    "create": [
      {
        "permission": "ANIMAL",
      },
      {
        "permission": "USER",
      },
    ],
  },
}
`);
  });
});

describe('validation functions', () => {
  it('validateCreate returns true for valid data', () => {
    const dto = makeFrontendCreateDto();
    expect(validateCreate(dto)).toBe(true);
  });

  for (const key of ['login', 'firstName', 'lastName', 'password'] as const) {
    it('validateCreate returns false for invalid data: ' + key, () => {
      const data = makeFrontendCreateDto();
      data[key] = '';
      expect(validateCreate(data)).toBe(false);
    });
  }

  it('validateCreate returns false for invalid permissions', () => {
    const data = makeFrontendCreateDto();
    data.permissions.push('tets' as Permission);
    expect(validateCreate(data)).toBe(false);
  });

  it('validateSelfUpdate returns true for valid data', () => {
    const data = makeFrontendSelfUpdateDto();
    expect(validateSelfUpdate(data)).toBe(true);
  });

  for (const key of Object.keys(
    makeFrontendSelfUpdateDto(),
  ) as (keyof FrontendSelfUpdateDto)[]) {
    it('validateSelfUpdate returns false for invalid data: ' + key, () => {
      const data = makeFrontendSelfUpdateDto();
      data[key] = '';
      expect(validateSelfUpdate(data)).toBe(false);
    });
  }

  it('validateOtherUserUpdate validates data', () => {
    const validData: FrontendUpdateOtherUserDto = {
      isActive: true,
      permissions: allPermissions,
    };
    expect(validateOtherUserUpdate(validData)).toBe(true);

    const invalidData: FrontendUpdateOtherUserDto = {
      isActive: true,
      permissions: [...allPermissions, 'tets' as Permission],
    };
    expect(validateOtherUserUpdate(invalidData)).toBe(false);
  });
});
