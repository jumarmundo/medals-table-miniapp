import { Country, ICountryRepository } from "@/domain";

export class CountryRepository implements ICountryRepository {
  async fetchAll(): Promise<Country[]> {
    const res = await fetch(`${process.env.API_URL}/data/medals.json`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch medals");
    const raw: unknown = await res.json();
    const arr = Array.isArray(raw) ? raw : (raw as any).default;
    return (arr as any[]).map(
      (o) =>
        new Country(o.code, Number(o.gold), Number(o.silver), Number(o.bronze))
    );
  }
}
