import { Country } from "@/domain";
import { CountryRepository } from "@/infrastructure/CountryRepository";

describe("CountryRepository", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
      NEXT_PUBLIC_API_URL: "https://api.example.com",
    };
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.restoreAllMocks();
  });

  it("fetches an array of country objects and returns Country instances", async () => {
    const mockData = [
      { code: "USA", gold: "2", silver: "1", bronze: "0" },
      { code: "RUS", gold: "1", silver: "2", bronze: "1" },
    ];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const repo = new CountryRepository();
    const result = await repo.fetchAll();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/data/medals.json",
      { cache: "no-store" }
    );
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(Country);
    expect(result[0].code).toBe("USA");
    expect(result[0].gold).toBe(2);
    expect(result[0].silver).toBe(1);
    expect(result[0].bronze).toBe(0);
    expect(result[1].code).toBe("RUS");
    expect(result[1].gold).toBe(1);
    expect(result[1].silver).toBe(2);
    expect(result[1].bronze).toBe(1);
  });

  it("handles JSON with a default property", async () => {
    const mockDefault = [{ code: "GBR", gold: "3", silver: "0", bronze: "2" }];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ default: mockDefault }),
    });

    const repo = new CountryRepository();
    const result = await repo.fetchAll();

    expect(result).toHaveLength(1);
    expect(result[0].code).toBe("GBR");
    expect(result[0].gold).toBe(3);
    expect(result[0].silver).toBe(0);
    expect(result[0].bronze).toBe(2);
  });

  it("throws an error when fetch response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    const repo = new CountryRepository();
    await expect(repo.fetchAll()).rejects.toThrow("Failed to fetch medals");
  });
});
