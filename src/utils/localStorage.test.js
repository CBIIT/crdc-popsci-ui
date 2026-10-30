import {
  storeInLocalStorage,
  getFromLocalStorage,
  deleteFromLocalStorage,
} from './localStorage';

describe('localStorage utils', () => {
  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('stores and retrieves JSON data', () => {
    const payload = { user: 'alice', roles: ['admin'] };

    storeInLocalStorage('session', payload);

    expect(getFromLocalStorage('session')).toEqual(payload);
  });

  it('returns an empty object when key is missing', () => {
    expect(getFromLocalStorage('missing-key')).toEqual({});
  });

  it('deletes a key from local storage', () => {
    storeInLocalStorage('temp', { active: true });

    deleteFromLocalStorage('temp');

    expect(getFromLocalStorage('temp')).toEqual({});
  });
});
