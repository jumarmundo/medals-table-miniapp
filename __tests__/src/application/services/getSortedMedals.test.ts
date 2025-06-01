import type { CountryDTO } from "@/domain";

jest.mock("@/infrastructure/CountryRepository", () => ({
  CountryRepository: jest.fn().mockImplementation(() => ({
    fetchAll: jest.fn().mockResolvedValue([
      {
        toDTO: () => ({
          code: "USA",
          gold: 2,
          silver: 0,
          bronze: 0,
          total: 2,
        }),
      },
      {
        toDTO: () => ({
          code: "RUS",
          gold: 1,
          silver: 1,
          bronze: 0,
          total: 2,
        }),
      },
    ]),
  })),
}));

import { getSortedMedals } from "@/application/services/getSortedMedals";
import { MedalSorter } from "@/domain";

describe("getSortedMedals", () => {
  let sortSpy: jest.SpyInstance;

  beforeEach(() => {
    sortSpy = jest
      .spyOn(MedalSorter, "sort")
      .mockImplementation((dtos: CountryDTO[]) => {
        return [...dtos].reverse();
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("uses MedalSorter.sort and returns its result", async () => {
    const result = await getSortedMedals("gold");
    expect(sortSpy).toHaveBeenCalledWith(
      [
        { code: "USA", gold: 2, silver: 0, bronze: 0, total: 2 },
        { code: "RUS", gold: 1, silver: 1, bronze: 0, total: 2 },
      ],
      "gold"
    );
    // we mock out this domain services because we don't want to test the implementation of that
    // so we just assert that it's been reversed, because that's how we mocked it
    expect(result).toEqual([
      { code: "RUS", gold: 1, silver: 1, bronze: 0, total: 2 },
      { code: "USA", gold: 2, silver: 0, bronze: 0, total: 2 },
    ]);
  });

  it("throws a wrapped error if the repository rejects", async () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    const { CountryRepository } =
      require("@/infrastructure/CountryRepository") as {
        CountryRepository: jest.Mock;
      };
    CountryRepository.mockImplementationOnce(() => ({
      fetchAll: jest.fn().mockRejectedValue(new Error("DB failure")),
    }));

    await expect(getSortedMedals("silver")).rejects.toThrow(
      "Error occured when getting medals for countries sorted by silver"
    );
    expect(sortSpy).not.toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Error occurred in application service",
      expect.any(Error)
    );
  });
});
