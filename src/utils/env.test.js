import { getEnvBoolean } from './env';

describe('getEnvBoolean', () => {
  it('returns the environment variable when it is a boolean true', () => {
    expect(getEnvBoolean(true, false)).toBe(true);
  });

  it('returns the environment variable when it is a boolean false', () => {
    expect(getEnvBoolean(false, true)).toBe(false);
  });

  it('returns false when the environment variable is the string "false"', () => {
    expect(getEnvBoolean('false', true)).toBe(false);
  });

  it('returns the default value when envVariable is undefined', () => {
    expect(getEnvBoolean(undefined, true)).toBe(true);
    expect(getEnvBoolean(undefined, false)).toBe(false);
  });

  it('returns the default value when envVariable is not a boolean (e.g., string, number, object)', () => {
    expect(getEnvBoolean('true', false)).toBe(false);
    expect(getEnvBoolean(1, false)).toBe(false);
    expect(getEnvBoolean({}, false)).toBe(false);
    expect(getEnvBoolean(null, true)).toBe(true);
  });
});
