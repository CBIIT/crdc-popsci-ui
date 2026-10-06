import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import useVisitedPageSync from './useVisitedPageSync';
import { LAST_VISITED_HASH_KEY } from '../bento/siteWideConfig';

function HookHarness() {
  useVisitedPageSync();
  return null;
}

describe('useVisitedPageSync', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    localStorage.clear();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  });

  it('stores the current hash in local storage for non-login routes', () => {
    window.location.hash = '#/explore';

    act(() => {
      ReactDOM.render(<HookHarness />, container);
    });

    expect(localStorage.getItem(LAST_VISITED_HASH_KEY)).toBe('#/explore');
  });

  it('does not store the login hash', () => {
    window.location.hash = '#/user/login';

    act(() => {
      ReactDOM.render(<HookHarness />, container);
    });

    expect(localStorage.getItem(LAST_VISITED_HASH_KEY)).toBeNull();
  });
});