import { CountryDTO, ICountryRepository, MedalSorter, SortType } from "@/domain";
import { CountryRepository } from "@/infrastructure/CountryRepository";

export async function getSortedMedals(sortKey: SortType): Promise<CountryDTO[]> {
  const repo: ICountryRepository = new CountryRepository();
  const countries = await repo.fetchAll();
  const countryDTOs = countries.map(country => country.toDTO());
  return MedalSorter.sort(countryDTOs, sortKey);
}
