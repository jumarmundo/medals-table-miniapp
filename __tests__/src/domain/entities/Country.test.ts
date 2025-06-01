import { Country, CountryDTO } from "@/domain";

describe("Country entity", () => {
  it("calculates total correctly", () => {
    const country = new Country("USA", 1, 2, 3);
    expect(country.total).toBe(6);
  });

  it("calculates zero total when all medals are zero", () => {
    const country = new Country("ZZZ", 0, 0, 0);
    expect(country.total).toBe(0);
  });

  it("converts to DTO correctly", () => {
    const country = new Country("RUS", 2, 1, 0);
    const dto: CountryDTO = country.toDTO();
    expect(dto).toEqual({
      code: "RUS",
      gold: 2,
      silver: 1,
      bronze: 0,
      total: 3,
    });
  });
});
