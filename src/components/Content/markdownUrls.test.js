import { safeImageUrl, safeLinkUrl } from './markdownUrls';

describe('Markdown URL policy', () => {
  it('allows HTTPS, simple mail links, and application-relative paths', () => {
    expect(safeLinkUrl('https://www.cancer.gov/research')).toBe('https://www.cancer.gov/research');
    expect(safeLinkUrl('mailto:NCICRDC@mail.nih.gov')).toBe('mailto:NCICRDC@mail.nih.gov');
    expect(safeLinkUrl('/about')).toBe('/about');
  });

  it.each([
    // eslint-disable-next-line no-script-url
    'javascript:alert(1)',
    // eslint-disable-next-line no-script-url
    'JaVaScRiPt:alert(1)',
    '%6a%61vascript:alert(1)',
    'data:text/html,bad',
    'blob:https://example.org/id',
    'file:///tmp/file',
    '//example.org/path',
    'http://example.org',
    'https://user:password@example.org',
    'java\nscript:alert(1)',
  ])('rejects unsafe link %s', (value) => {
    expect(safeLinkUrl(value)).toBeNull();
  });

  it('allows only approved raw GitHub images', () => {
    expect(safeImageUrl('https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/image.png'))
      .toBe('https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/image.png');
    expect(safeImageUrl('https://raw.githubusercontent.com/CBIIT/unapproved/main/image.png')).toBeNull();
    expect(safeImageUrl('https://example.org/tracker.png')).toBeNull();
    expect(safeImageUrl('data:image/png;base64,AAAA')).toBeNull();
  });
});
