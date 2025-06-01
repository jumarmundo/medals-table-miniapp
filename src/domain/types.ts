export const SORT_KEYS = ["gold","silver","bronze","total"] as const;
export type SortType = (typeof SORT_KEYS)[number];

export function isSortType(value: unknown): value is SortType {
  return typeof value === "string" && (SORT_KEYS as readonly string[]).includes(value);
}