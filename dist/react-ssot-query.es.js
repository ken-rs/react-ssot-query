import { useSearchParams as g } from "react-router-dom";
import { useMemo as u, useCallback as m, useRef as l, useEffect as S } from "react";
function i(e) {
  return Object.fromEntries(
    e.split(",").map((t) => t.split("~")).filter(([t, r]) => t && r)
  );
}
function h(e) {
  return Object.entries(e).map(([t, r]) => `${t}~${r}`).join(",");
}
function p(e) {
  const [t, r] = g(), n = t.get(e) || "", a = u(() => i(n), [n]), s = m(
    (c) => {
      const f = { ...i(n), ...c }, o = new URLSearchParams(t.toString());
      o.set(e, h(f)), r(o, { replace: !0 });
    },
    [n, t, r, e]
  );
  return [a, s];
}
function w(e, t) {
  const [r, n] = p(e), a = u(() => r[t] || null, [r[t]]), s = m(
    (c) => {
      n({ [t]: c });
    },
    [n, t]
  );
  return [a, s];
}
function O(e, t) {
  const [r] = p(e), n = l(r);
  S(() => {
    const a = n.current;
    JSON.stringify(a) !== JSON.stringify(r) && (n.current = r, t(r));
  }, [r, t]);
}
export {
  O as useParamChangeWatcher,
  p as useParamConfig,
  w as useSubParamState
};
