"use client";

import { useState, useMemo } from "react";
import { CountryDTO, MedalSorter, type SortType } from "@/domain";
import MedalTable from "./MedalTable";
import { useSortMedals } from "../hooks/useSortedMedals";

interface Props {
  initialSort: SortType;
  initialData: CountryDTO[];
}

export default function MedalTableContainer({
  initialSort,
  initialData,
}: Props) {
  const [sortKey, setSortKey] = useState<SortType>(initialSort);

  const updateQueryString = (sortKey: SortType) => {
    const url = new URL(window.location.href);
    url.searchParams.set("sort", sortKey);
    window.history.replaceState(null, "", url);
  };

  const handleSort = (sortKey: SortType) => {
    updateQueryString(sortKey);
    setSortKey(sortKey);
  };

  const sortedCountries = useSortMedals(initialData, sortKey);

  return (
    <MedalTable
      countries={sortedCountries}
      sortKey={sortKey}
      onSortChange={handleSort}
    />
  );
}
