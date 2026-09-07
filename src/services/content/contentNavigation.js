import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import getContentConfig from './contentConfig';
import { CONTENT_ROUTES, createContentClient } from './contentClient';

const DEFAULT_MENU_LABELS = Object.freeze({
  '/about': 'About',
  '/access_data': 'Access Data',
  '/analyze_data': 'Analyze Data',
  '/support': 'Support',
});

const GRAPHQL_MENU_ITEM = Object.freeze({
  name: 'GraphQL',
  link: '/graphql',
  id: 'navbar-dropdown-item-graphql',
  className: 'navMobileSubItem',
});

export const fallbackManifestPages = Object.entries(CONTENT_ROUTES).map(([route, slug]) => ({
  route,
  slug,
  title: DEFAULT_MENU_LABELS[route],
}));

export const buildAboutMenuItems = (pages) => [
  ...pages.map((page) => ({
    name: page.menuLabel || DEFAULT_MENU_LABELS[page.route] || page.title,
    link: page.route,
    id: `navbar-dropdown-item-${page.slug}`,
    className: 'navMobileSubItem',
  })),
  GRAPHQL_MENU_ITEM,
];

const initialNavigation = {
  pages: fallbackManifestPages,
  menuItems: buildAboutMenuItems(fallbackManifestPages),
};

const useContentNavigation = () => {
  const config = useMemo(() => getContentConfig(), []);
  const [navigation, setNavigation] = useState(initialNavigation);
  const requestId = useRef(0);

  useEffect(() => {
    if (!config.enabled) return undefined;

    let activeController = null;
    let client;
    try {
      client = createContentClient(config);
    } catch (error) {
      setNavigation(initialNavigation);
      return undefined;
    }
    const load = async () => {
      const currentRequest = requestId.current + 1;
      requestId.current = currentRequest;
      if (activeController) activeController.abort();
      const controller = new AbortController();
      activeController = controller;
      try {
        const manifest = await client.fetchManifest(controller.signal);
        if (requestId.current !== currentRequest || controller.signal.aborted) return;
        setNavigation({
          pages: manifest.pages,
          menuItems: buildAboutMenuItems(manifest.pages),
        });
      } catch (error) {
        if (error.name !== 'AbortError') setNavigation(initialNavigation);
      } finally {
        if (activeController === controller) activeController = null;
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible') load();
    };
    load();
    window.addEventListener('focus', load);
    document.addEventListener('visibilitychange', onVisibility);
    const interval = config.pollMs > 0 ? window.setInterval(load, config.pollMs) : null;

    return () => {
      requestId.current += 1;
      if (activeController) activeController.abort();
      window.removeEventListener('focus', load);
      document.removeEventListener('visibilitychange', onVisibility);
      if (interval !== null) window.clearInterval(interval);
    };
  }, [config]);

  return navigation;
};

export default useContentNavigation;
