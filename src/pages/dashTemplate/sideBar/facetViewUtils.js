export const HIDE_COUNT_SORT_SELECTOR = '[data-hide-count-sort="true"] + .MuiCollapse-root [role="region"] > div > span:nth-of-type(3)';

export const getFacetViewDataProps = (facet = {}) => ({
  'data-hide-count-sort': facet.hideCountSort ? 'true' : undefined,
});
