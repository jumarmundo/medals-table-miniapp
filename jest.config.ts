import type { Config } from "jest";

const config: Config = {
  rootDir: ".",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleNameMapper: {
    "^@/domain$": "<rootDir>/src/domain/index",
    "^@/domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@/application/(.*)$": "<rootDir>/src/application/$1",
    "^@/infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1",
  },
};

export default config;
