/** Prefix an internal path with the site's base path (see `base` in astro.config.mjs). */
export function url(path: string) {
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
}
