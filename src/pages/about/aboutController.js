import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import AboutView from './aboutView';
import getContentConfig from '../../services/content/contentConfig';
import {
  createContentClient,
  ContentConfigurationError,
  ContentNotFoundError,
} from '../../services/content/contentClient';
import getFallbackPage from '../../services/content/fallbackContent';

const initialState = (route, config) => {
  const fallback = config.fallbackEnabled ? getFallbackPage(route) : null;
  if (!config.enabled) {
    return fallback
      ? { status: 'ready', page: fallback, source: 'fallback', notice: null }
      : { status: 'configurationError', page: null, source: null, notice: null };
  }
  return { status: 'loading', page: null, source: null, notice: null };
};

const About = ({ match }) => {
  const route = match.url;
  const config = useMemo(() => getContentConfig(), []);
  const fallback = useMemo(() => getFallbackPage(route), [route]);
  const requestId = useRef(0);
  const activeController = useRef(null);
  const [state, setState] = useState(() => initialState(route, config));

  const client = useMemo(() => {
    if (!config.enabled) return null;
    try {
      return createContentClient(config);
    } catch (error) {
      return { configurationError: error };
    }
  }, [config]);

  const load = useCallback(async (background = false) => {
    if (!config.enabled) return;
    if (client && client.configurationError) {
      setState({ status: 'configurationError', page: null, source: null, notice: client.configurationError.message });
      return;
    }
    const currentRequest = requestId.current + 1;
    requestId.current = currentRequest;
    if (activeController.current) activeController.current.abort();
    const controller = new AbortController();
    activeController.current = controller;
    setState((current) => ({
      ...current,
      status: background && current.page ? 'refreshing' : 'loading',
      notice: null,
    }));
    try {
      const page = await client.fetchPage(route, controller.signal);
      if (requestId.current !== currentRequest || controller.signal.aborted) return;
      setState({ status: 'ready', page, source: 'remote', notice: null });
    } catch (error) {
      if (controller.signal.aborted || requestId.current !== currentRequest) return;
      if (error instanceof ContentNotFoundError) {
        setState({ status: 'notFound', page: null, source: null, notice: error.message });
      } else if (error instanceof ContentConfigurationError) {
        setState({ status: 'configurationError', page: null, source: null, notice: error.message });
      } else {
        setState((current) => {
          if (current.page) {
            return { ...current, status: 'stale', notice: 'Updated content is temporarily unavailable. Showing the current page.' };
          }
          if (config.fallbackEnabled && fallback) {
            return { status: 'stale', page: fallback, source: 'fallback', notice: 'Live content is temporarily unavailable. Showing the bundled fallback.' };
          }
          return { status: 'error', page: null, source: null, notice: error.message };
        });
      }
    } finally {
      if (activeController.current === controller) activeController.current = null;
    }
  }, [client, config.enabled, config.fallbackEnabled, fallback, route]);

  useEffect(() => {
    setState(initialState(route, config));
    load(false);
    return () => {
      requestId.current += 1;
      if (activeController.current) activeController.current.abort();
    };
  }, [config, load, route]);

  useEffect(() => {
    if (!config.enabled) return undefined;
    const revalidate = () => load(true);
    const onVisibility = () => {
      if (document.visibilityState === 'visible') revalidate();
    };
    window.addEventListener('focus', revalidate);
    document.addEventListener('visibilitychange', onVisibility);
    const interval = config.pollMs > 0 ? window.setInterval(revalidate, config.pollMs) : null;
    return () => {
      window.removeEventListener('focus', revalidate);
      document.removeEventListener('visibilitychange', onVisibility);
      if (interval !== null) window.clearInterval(interval);
    };
  }, [config.enabled, config.pollMs, load]);

  return <AboutView {...state} onRetry={() => load(false)} />;
};

export default About;
