import { Permission } from '@prisma-app/client';
import { diff, havePermissionsChanged, formattedDiff } from '../diff';

type MockDiff = { f: number; t?: string };
const from: MockDiff = { f: 1, t: null };
const to: MockDiff = { f: 2, t: 't' };
const props = [
  {
    name: 'poleF',
    selector: (obj: MockDiff) => obj.f,
  },
  {
    name: 'poleT',
    selector: (obj: MockDiff) => obj.t,
  },
];
const additionalChanges = [
  {
    name: 'additional',
    selector: (obj: MockDiff) => obj.f + obj.t,
  },
];

describe('diff', () => {
  it('diffs simple values', () => {
    const from = 'a';
    const to = 'b';
    const props = [
      {
        name: 'jakaszmienna',
        selector: (str: string) => str,
      },
    ];
    const changes = diff(from, to, props);
    expect(changes).toHaveLength(1);
    expect(changes[0]).toMatchObject({
      name: 'jakaszmienna',
      fromValue: 'a',
      toValue: 'b',
    });
  });

  it('diffs objects with multiple properties', () => {
    const changes = diff(from, to, props);
    expect(changes).toMatchObject([
      {
        name: 'poleF',
        fromValue: 1,
        toValue: 2,
      },
      {
        name: 'poleT',
        fromValue: null,
        toValue: 't',
      },
    ]);
  });

  it('diffs objects, ommitting values if set', () => {
    const changes = diff(from, to, [
      props[0],
      {
        ...props[1],
        omitValues: true,
      },
    ]);
    expect(changes).toMatchObject([
      {
        name: 'poleF',
        fromValue: 1,
        toValue: 2,
      },
      { name: 'poleT' },
    ]);
  });
});

describe('havePermissionsChanged', () => {
  it('checks if permissions changed', () => {
    expect(
      havePermissionsChanged([Permission.ANIMAL], [Permission.ANIMAL]),
    ).toBe(false);

    expect(havePermissionsChanged([Permission.ANIMAL], [Permission.NEWS])).toBe(
      true,
    );

    expect(havePermissionsChanged([Permission.NEWS], [Permission.ANIMAL])).toBe(
      true,
    );

    expect(
      havePermissionsChanged(
        [Permission.NEWS, Permission.USER],
        [Permission.ANIMAL],
      ),
    ).toBe(true);

    expect(
      havePermissionsChanged(
        [Permission.NEWS],
        [Permission.ANIMAL, Permission.PAGE],
      ),
    ).toBe(true);
  });
});

describe('formattedDiff', () => {
  it('displays no changes if there are no changes', () => {
    expect(
      formattedDiff(from, from, props, additionalChanges),
    ).toMatchInlineSnapshot(`"(additional)"`);
  });

  it('formats diff', () => {
    expect(formattedDiff(from, to, props, [])).toMatchInlineSnapshot(
      `"(poleF: 1 -> 2, poleT: null -> t)"`,
    );
  });

  it('handles additionalChanges', () => {
    expect(
      formattedDiff(from, to, props, additionalChanges),
    ).toMatchInlineSnapshot(`"(poleF: 1 -> 2, poleT: null -> t, additional)"`);
  });
});
