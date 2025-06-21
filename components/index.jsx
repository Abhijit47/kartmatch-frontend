'use client';

import dynamic from 'next/dynamic';
import DynamicLoader from './DynamicLoader';

export const LazyLocateMap = dynamic(() => import('./LocateMap'), {
  ssr: false,
  loading: () => <DynamicLoader />,
});

export const LazyLocateUs = dynamic(() => import('./LocateUs'), {
  ssr: false,
  loading: () => <DynamicLoader />,
});
