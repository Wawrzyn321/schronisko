import { validateNewsCreate, validateNewsUpdate } from '../helpers';

describe('validateNewsCreate', () => {
  it('Returns true for valid news create', () => {
    expect(validateNewsCreate({ title: 'title' }, 'aaa')).toBe(true);
  });

  it('Returns false for invalid news create', () => {
    expect(validateNewsCreate({ title: 'title' }, '')).toBe(false);
    expect(validateNewsCreate({ title: '' }, 'aaa')).toBe(false);
    expect(validateNewsCreate({ title: '' }, '')).toBe(false);
  });
});

describe('validateNewsUpdate', () => {
  it('Returns true for valid news update', () => {
    expect(validateNewsUpdate({ title: 'title' })).toBe(true);
  });
  it('Returns false for invalid news update', () => {
    expect(validateNewsUpdate({ title: '' })).toBe(false);
  });
});
