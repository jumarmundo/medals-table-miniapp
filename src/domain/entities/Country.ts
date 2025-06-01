import { CountryDTO } from "../dtos/country.dto";

export class Country {
  readonly code: string;
  readonly gold: number;
  readonly silver: number;
  readonly bronze: number;

  constructor(code: string, gold: number, silver: number, bronze: number) {
    this.code = code;
    this.gold = gold;
    this.silver = silver;
    this.bronze = bronze;
  }

  get total(): number {
    return this.gold + this.silver + this.bronze;
  }

  toDTO(): CountryDTO {
    return {
      code: this.code,
      gold: this.gold,
      silver: this.silver,
      bronze: this.bronze,
      total: this.total,
    };
  }
}
