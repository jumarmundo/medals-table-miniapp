import { CountryDTO } from "../dtos/country.dto";
import type { SortType } from "../types";

export class MedalSorter {
  static sort(data: CountryDTO[], sortKey: SortType): CountryDTO[] {
    return [...data].sort((a, b) => {
      switch (sortKey) {
        case "gold":
          return b.gold - a.gold || b.silver - a.silver;
        case "silver":
          return b.silver - a.silver || b.gold - a.gold;
        case "bronze":
          return b.bronze - a.bronze || b.gold - a.gold;
        case "total":
          return b.total - a.total || b.gold - a.gold;
        default:
          return b.gold - a.gold;
      }
    })
  }
}
