import { Settings } from '@prisma/client';
import { containsSubsitution, substitute } from '../substitutions';

describe('subsitutions', () => {
  describe('containsSubsitution', () => {
    it('returns true if string contains special strings', () => {
      expect(containsSubsitution('test %KONTO%2')).toBe(true);
    });
    it('returns false if string contains no special strings', () => {
      expect(containsSubsitution('test KONTO%2')).toBe(false);
    });
  });

  describe('substitute', () => {
    it('subsitutes', () => {
      const mockSettings: Settings[] = [
        {
          id: 'V_ADOPTION_ACCOUNT_NUMBER',
          value: 'VACN',
        },
        {
          id: 'WONT_HAPPEN',
          value: "doesn't matter",
        },
      ];
      const str = `test %KONTO% %KONTO% %NOT_FOUND%`;
      expect(substitute(str, mockSettings)).toMatchInlineSnapshot(
        `"test VACN VACN %NOT_FOUND%"`,
      );
    });
  });
});
