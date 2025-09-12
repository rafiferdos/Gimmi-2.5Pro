// Lightweight shim for @eslint/compat to avoid build-time failures when
// the package isn't installed. The real package provides helpers to
// adapt plugin/extend configs; for our purposes we can no-op them.
export function fixupConfigRules(x) {
  return x;
}

export function fixupPluginRules(p) {
  return p;
}
