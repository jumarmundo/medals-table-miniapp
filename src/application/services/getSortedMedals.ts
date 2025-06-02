import {
  CountryDTO,
  ICountryRepository,
  MedalSorter,
  SortType,
} from "@/domain";
import { CountryRepository } from "@/infrastructure/CountryRepository";

export async function getSortedMedals(
  sortKey: SortType
): Promise<CountryDTO[]> {
  try {
    const repo: ICountryRepository = new CountryRepository();
    const countries = await repo.fetchAll();
    const countryDTOs = countries.map((country) => country.toDTO());
    return MedalSorter.sort(countryDTOs, sortKey).slice(-10);
  } catch (error) {
    console.log("Error occurred in application service", error);
    throw new Error(
      `Error occured when getting medals for countries sorted by ${sortKey}`
    );
  }
}
