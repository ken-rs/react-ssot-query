import { useSearchParams } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import { parseViewerString } from '../utils/parseViewerString';
import { buildViewerString } from '../utils/buildViewerString';

/**
 * 指定paramKey（例: "filter"）の設定を一括取得・更新できるHook
 */
export function useParamConfig(paramKey: string): [
  Record<string, string>,
  (updates: Partial<Record<string, string>>) => void
] {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramString = searchParams.get(paramKey) || '';

  const paramMap = useMemo(() => {
    return parseViewerString(paramString);
  }, [paramString]);

  const setParamMap = useCallback(
    (updates: Partial<Record<string, string>>) => {
      const current = parseViewerString(paramString);
      const merged = { ...current, ...updates };
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(paramKey, buildViewerString(merged));
      setSearchParams(newParams, { replace: true });
    },
    [paramString, searchParams, setSearchParams, paramKey]
  );

  return [paramMap, setParamMap];
}
