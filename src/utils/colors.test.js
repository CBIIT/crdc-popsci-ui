import colors from './colors';

describe('colors', () => {
  it('exports a color palette object with odd and even properties', () => {
    expect(colors).toBeDefined();
    expect(colors.odd).toBeDefined();
    expect(colors.even).toBeDefined();
  });

  it('exports arrays of color hex strings', () => {
    expect(Array.isArray(colors.odd)).toBe(true);
    expect(Array.isArray(colors.even)).toBe(true);
  });

  it('contains valid hex color codes', () => {
    const hexRegex = /^#[0-9A-F]{6}$/i;
    
    colors.odd.forEach((color) => {
      expect(hexRegex.test(color)).toBe(true);
    });

    colors.even.forEach((color) => {
      expect(hexRegex.test(color)).toBe(true);
    });
  });

  it('has identical odd and even color arrays', () => {
    expect(colors.odd).toEqual(colors.even);
  });

  it('contains at least 13 colors', () => {
    expect(colors.odd.length).toBeGreaterThanOrEqual(13);
    expect(colors.even.length).toBeGreaterThanOrEqual(13);
  });

  it('includes specific named colors', () => {
    expect(colors.odd).toContain('#6ECDD3'); // First color
    expect(colors.even).toContain('#C01E2E'); // red
    expect(colors.odd).toContain('#E3AB19');
    expect(colors.even).toContain('#F2E297'); // yellow
  });

  it('has matching length for odd and even arrays', () => {
    expect(colors.odd.length).toBe(colors.even.length);
  });
});
