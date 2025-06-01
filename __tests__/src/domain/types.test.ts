import { isSortType, SORT_KEYS, SortType } from "@/domain";

describe("isSortType", () => {
  it("returns true for each valid SortType", () => {
    for (const key of SORT_KEYS) {
      expect(isSortType(key)).toBe(true);
    }
  });

  it("returns false for invalid strings", () => {
    const invalidStrings = ["Gold", "silver ", "bronze!", "", "totals"];
    for (const value of invalidStrings) {
      expect(isSortType(value)).toBe(false);
    }
  });

  it("returns false for non-string values", () => {
    const values: unknown[] = [
      123,
      null,
      undefined,
      {},
      [],
      true,
      Symbol("gold"),
    ];
    for (const value of values) {
      expect(isSortType(value)).toBe(false);
    }
  });

  it("narrowing works in a type guard context", () => {
    const unknownValues: unknown[] = ["gold", "foo", 42, "total", {}];
    const filtered = unknownValues.filter((v): v is SortType => isSortType(v));
    expect(filtered).toEqual(["gold", "total"]);
  });
});
