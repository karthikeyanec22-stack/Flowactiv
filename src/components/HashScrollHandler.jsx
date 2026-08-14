'use client';

import { useEffect } from 'react';

export default function HashScrollHandler() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Disable browser scroll restoration so it never jumps back to previous scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Strip any hash from the URL using replaceState without adding to browser history
    if (window.location.hash) {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      );
    }

    // 3. Force scroll to top (0, 0) immediately
    window.scrollTo(0, 0);

    // Backup scroll resets during hydration & layout shifts
    const t1 = setTimeout(() => window.scrollTo(0, 0), 50);
    const t2 = setTimeout(() => window.scrollTo(0, 0), 200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return null;
}
