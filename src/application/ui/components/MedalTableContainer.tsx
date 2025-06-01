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

  const handleSort = (sortKey: SortType) => {
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
