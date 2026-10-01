jest.mock('../utils/graphqlClient', () => ({
  __esModule: true,
  default: { query: jest.fn() },
}));

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getRenderableModelResults } from './search';
import ValueCard from '../pages/search/Cards/ValueCard';

describe('getRenderableModelResults', () => {
  it('keeps property hits and excludes enum values and node hits', () => {
    const results = getRenderableModelResults([
      { type: 'property', node_name: 'study', property_name: 'age' },
      { type: 'node', node_name: 'study' },
      { type: 'value', node_name: 'study', property_name: 'age' },
      { type: 'unsupported', node_name: 'study' },
    ]);

    expect(results).toEqual([
      { type: 'property', node_name: 'study', property_name: 'age' },
    ]);
  });

  it('deduplicates enum-expanded property hits by node and property', () => {
    const results = getRenderableModelResults([
      { type: 'property', node_name: 'study', property_name: 'age' },
      { type: 'value', node_name: 'study', property_name: 'age' },
      { type: 'property', node_name: 'study', property_name: 'age' },
      { type: 'property', node_name: 'study', property_name: 'sex' },
      { type: 'property', node_name: 'participant', property_name: 'age' },
    ]);

    expect(results).toEqual([
      { type: 'property', node_name: 'study', property_name: 'age' },
      { type: 'property', node_name: 'study', property_name: 'sex' },
      { type: 'property', node_name: 'participant', property_name: 'age' },
    ]);
  });

  it('renders the property name on a Data Model result card', () => {
    const markup = renderToStaticMarkup(
      <ValueCard
        data={{
          type: 'property',
          node_name: 'study',
          property_name: 'participant_age',
          property_description: 'Participant age in years',
        }}
      />,
    );

    expect(markup).toContain('Property Name:');
    expect(markup).toContain('participant_age');
  });
});