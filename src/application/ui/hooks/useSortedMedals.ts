import { CountryDTO, MedalSorter, type SortType } from "@/domain";
import { useMemo } from "react";

export function useSortMedals(
  data: CountryDTO[],
  sortKey: SortType
): CountryDTO[] {
  return useMemo(() => MedalSorter.sort(data, sortKey), [data, sortKey]);
}