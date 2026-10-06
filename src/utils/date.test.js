import getDateInFormat from './date';

describe('getDateInFormat', () => {
  it('returns an empty string when dateString is empty', () => {
    expect(getDateInFormat('')).toBe('');
  });

  it('formats using slash separators by default', () => {
    expect(getDateInFormat('2024-03-02T00:00:00')).toBe('2024/3/2');
  });

  it('formats using the provided separator', () => {
    expect(getDateInFormat('2024-03-02T00:00:00', '-')).toBe('3-2-2024');
  });
});
