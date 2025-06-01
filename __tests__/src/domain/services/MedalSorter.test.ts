import { CountryDTO, MedalSorter, SortType } from "@/domain";

describe("MedalSorter domain service", () => {
  const sampleData: CountryDTO[] = [
    { code: "RUS", gold: 2, silver: 1, bronze: 0, total: 3 },
    { code: "CHN", gold: 1, silver: 2, bronze: 1, total: 4 },
    { code: "GBR", gold: 1, silver: 2, bronze: 2, total: 5 },
    { code: "USA", gold: 3, silver: 0, bronze: 0, total: 3 },
    { code: "GER", gold: 1, silver: 2, bronze: 2, total: 5 },
  ];

  it("sorts by gold descending, then by silver descending if gold is equal", () => {
    const sorted = MedalSorter.sort(sampleData, "gold");
    const codes = sorted.map((c) => c.code);
    expect(codes).toEqual(["USA", "RUS", "CHN", "GBR", "GER"]);
  });

  it("sorts by silver descending, then by gold descending if silver is equal", () => {
    const sorted = MedalSorter.sort(sampleData, "silver");
    const codes = sorted.map((c) => c.code);
    expect(codes).toEqual(["CHN", "GBR", "GER", "RUS", "USA"]);
  });

  it("sorts by bronze descending, then by gold descending if bronze is equal", () => {
    const sorted = MedalSorter.sort(sampleData, "bronze");
    const codes = sorted.map((c) => c.code);
    expect(codes).toEqual(["GBR", "GER", "CHN", "USA", "RUS"]);
  });

  it("sorts by total descending, then by gold descending if total is equal", () => {
    const sorted = MedalSorter.sort(sampleData, "total");
    const codes = sorted.map((c) => c.code);
    expect(codes).toEqual(["GBR", "GER", "CHN", "USA", "RUS"]);
  });

  it("defaults to sorting by gold when provided an invalid sortKey", () => {
    const sorted = MedalSorter.sort(sampleData, "invalidKey" as SortType);
    const codes = sorted.map((c) => c.code);
    expect(codes).toEqual(["USA", "RUS", "CHN", "GBR", "GER"]);
  });

  it("does not mutate the original array", () => {
    const dataCopy = [...sampleData];
    MedalSorter.sort(sampleData, "gold");
    expect(sampleData).toEqual(dataCopy);
  });

  it("handles an empty array without errors", () => {
    const empty: CountryDTO[] = [];
    const sorted = MedalSorter.sort(empty, "gold");
    expect(sorted).toEqual([]);
  });

  it("handles arrays with identical medal counts correctly", () => {
    const tieData: CountryDTO[] = [
      { code: "ARG", gold: 1, silver: 1, bronze: 1, total: 3 },
      { code: "AUS", gold: 1, silver: 1, bronze: 1, total: 3 },
      { code: "AUT", gold: 1, silver: 1, bronze: 1, total: 3 },
    ];
    const sorted = MedalSorter.sort(tieData, "gold");
    expect(sorted.map((c) => c.code)).toEqual(["ARG", "AUS", "AUT"]);
  });
});
