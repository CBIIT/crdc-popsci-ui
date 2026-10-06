import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import SuccessOutlined from './SuccessOutlined';

describe('SuccessOutlined', () => {
    it('renders an svg icon', () => {
      const markup = renderToStaticMarkup(<SuccessOutlined />);

      expect(markup).toContain('<svg');
      expect(markup).toContain('SuccessOutlined');
      expect(markup).toContain('<path');
  });
});