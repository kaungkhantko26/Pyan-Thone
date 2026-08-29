export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix an internal href with the deploy base path (for GitHub Pages project sites). */
export function href(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function mmk(value: number): string {
  return `${value.toLocaleString("en-US")} MMK`;
}
