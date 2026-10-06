import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ExternalLinkIcon from './ExternalLinkIcon';

describe('ExternalLinkIcon', () => {
  it('renders the default icon attributes', () => {
    const markup = renderToStaticMarkup(<ExternalLinkIcon />);

    expect(markup).toContain('<img');
    expect(markup).toContain('width="14"');
    expect(markup).toContain('height="14"');
    expect(markup).toContain('alt="outbound website icon"');
  });

  it('applies custom props to the icon', () => {
    const markup = renderToStaticMarkup(
      <ExternalLinkIcon
        src="/custom.svg"
        width={20}
        height={18}
        alt="external site"
        className="icon-link"
        style={{ marginLeft: '4px' }}
        data-testid="external-icon"
      />,
    );

    expect(markup).toContain('src="/custom.svg"');
    expect(markup).toContain('width="20"');
    expect(markup).toContain('height="18"');
    expect(markup).toContain('alt="external site"');
    expect(markup).toContain('class="icon-link"');
    expect(markup).toContain('style="margin-left:4px"');
    expect(markup).toContain('data-testid="external-icon"');
  });
});