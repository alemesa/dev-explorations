import type { RefCallback } from 'react';

import { useCallback, useRef } from 'react';

type RefFactory<T extends Record<keyof T, Element>> = <Key extends keyof T>(key: Key) => RefCallback<T[Key]>;

export function useRefs<T extends Record<keyof T, Element>>(): RefFactory<T> {
  const nodes = useRef<Partial<T>>({});

  return useCallback(
    (key) => (element) => {
      nodes.current[key] = element ?? undefined;
    },
    [],
  );
}
