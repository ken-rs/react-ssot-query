import { useMemo, useCallback } from 'react';
import { useParamConfig } from './useParamConfig';

/**
 * paramKey の中の subParamKey を useState 的に扱える Hook
 */
export function useSubParamState(paramKey: string, subParamKey: string): [
  string | null,
  (value: string) => void
] {
  const [paramMap, setParamMap] = useParamConfig(paramKey);

  const value = useMemo(() => paramMap[subParamKey] || null, [paramMap[subParamKey]]);

  const setValue = useCallback(
    (newValue: string) => {
      setParamMap({ [subParamKey]: newValue });
    },
    [setParamMap, subParamKey]
  );

  return [value, setValue];
}
