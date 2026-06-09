import { getFacetViewDataProps, HIDE_COUNT_SORT_SELECTOR } from './facetViewUtils';

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

describe('HIDE_COUNT_SORT_SELECTOR', () => {
  it('matches the count sort control through the Accordion collapse wrapper', () => {
    document.body.innerHTML = `
      <div>
        <div data-hide-count-sort="true"></div>
        <div class="MuiCollapse-root">
          <div>
            <div>
              <div role="region">
                <div>
                  <span>Clear</span>
                  <span>Sort alphabetically</span>
                  <span>Sort by count</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    expect(document.querySelector(HIDE_COUNT_SORT_SELECTOR)?.textContent).toBe('Sort by count');
  });
});
