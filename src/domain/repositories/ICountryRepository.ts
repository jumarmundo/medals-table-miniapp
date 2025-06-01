import { Country } from "../entities/Country";

export interface ICountryRepository {
  fetchAll(): Promise<Country[]>;
}
