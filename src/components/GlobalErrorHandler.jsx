'use client';

import { useEffect } from 'react';

export default function GlobalErrorHandler() {
  useEffect(() => {
    const handleResourceError = (event) => {
      // Prevent image & network resource load failure DOM events from bubbling to Next.js dev overlay as [object Event]
      if (
        event &&
        event.target &&
        (event.target.tagName === 'IMG' ||
          event.target.tagName === 'IMAGE' ||
          event.target.tagName === 'SCRIPT' ||
          event.target.tagName === 'LINK')
      ) {
        if (event.preventDefault) event.preventDefault();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      }
    };

    window.addEventListener('error', handleResourceError, true);
    return () => {
      window.removeEventListener('error', handleResourceError, true);
    };
  }, []);

  return null;
}
