import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import Anchor from './Anchor';

describe('Anchor', () => {
  it('renders an external anchor tag for absolute URLs', () => {
    const markup = renderToStaticMarkup(
      <Anchor
        link="https://example.org/docs"
        text="Docs"
        classes={{ link: 'anchor-link' }}
      />,
    );

    expect(markup).toContain('href="https://example.org/docs"');
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noopener noreferrer"');
    expect(markup).toContain('class="anchor-link"');
    expect(markup).toContain('>Docs<');
  });

  it('renders a router link for internal paths', () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter>
        <Anchor
          link="/studies/123"
          text="Study"
          classes={{ link: 'anchor-link' }}
        />
      </MemoryRouter>,
    );

    expect(markup).toContain('href="/studies/123"');
    expect(markup).toContain('class="anchor-link"');
    expect(markup).toContain('>Study<');
    expect(markup).not.toContain('target="_blank"');
  });
});