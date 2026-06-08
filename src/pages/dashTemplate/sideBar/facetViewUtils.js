export const getFacetViewDataProps = (facet = {}) => ({
  'data-hide-count-sort': facet.hideCountSort ? 'true' : undefined,
});
