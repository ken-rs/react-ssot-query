import { useEffect, useRef } from 'react';
import { useParamConfig } from './useParamConfig';

/**
 * paramKey の構成変更を検知して onChange を発火する Hook
 */
export function useParamChangeWatcher(
  paramKey: string,
  onChange: (paramMap: Record<string, string>) => void
) {
  const [paramMap] = useParamConfig(paramKey);
  const prevRef = useRef(paramMap);

  useEffect(() => {
    const prev = prevRef.current;
    const changed = JSON.stringify(prev) !== JSON.stringify(paramMap);
    if (changed) {
      prevRef.current = paramMap;
      onChange(paramMap);
    }
  }, [paramMap, onChange]);
}
