import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import DOMPurify from 'dompurify';
import LineBreaksRenderer from './LineBreaksRenderer';

jest.mock('dompurify', () => ({
  sanitize: jest.fn((html) => html),
}));

describe('LineBreaksRenderer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sanitizes content by default and preserves allowed line breaks', () => {
    DOMPurify.sanitize.mockReturnValueOnce('Line 1<br>Line 2');

    const markup = renderToStaticMarkup(
      <LineBreaksRenderer htmlContent="Line 1<br><script>bad()</script>Line 2" classes="copy" />,
    );

    expect(DOMPurify.sanitize).toHaveBeenCalledWith(
      'Line 1<br><script>bad()</script>Line 2',
      { ALLOWED_TAGS: ['br'] },
    );
    expect(markup).toContain('class="copy"');
    expect(markup).toContain('Line 1<br>Line 2');
  });

  it('renders raw content when sanitization is disabled', () => {
    const markup = renderToStaticMarkup(
      <LineBreaksRenderer htmlContent="Alpha<br>Beta" sanitize={false} classes="copy" />,
    );

    expect(DOMPurify.sanitize).not.toHaveBeenCalled();
    expect(markup).toContain('Alpha<br>Beta');
  });
});