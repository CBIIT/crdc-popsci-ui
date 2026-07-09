import { useEffect } from 'react';

export const useHideRechartsSpan = () => {
  useEffect(() => {
    const span = document.getElementById('recharts_measurement_span');
    if (span) span.setAttribute('aria-hidden', 'true');
  }, []);
};
