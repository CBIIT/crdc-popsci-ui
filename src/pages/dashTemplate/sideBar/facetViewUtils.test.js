import { getFacetViewDataProps } from './facetViewUtils';

describe('getFacetViewDataProps', () => {
  it('marks facets that should hide count sorting', () => {
    expect(getFacetViewDataProps({ hideCountSort: true })).toEqual({
      'data-hide-count-sort': 'true',
    });
  });

  it('does not mark facets that allow count sorting', () => {
    expect(getFacetViewDataProps({})).toEqual({
      'data-hide-count-sort': undefined,
    });
  });
});
