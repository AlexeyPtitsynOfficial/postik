import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config: Config = {
  //coverageProvider: 'v8',
  //testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
  extensionsToTreatAsEsm: [".ts"],
  testEnvironment: "jest-fixed-jsdom",
  /*globals: {
    "ts-jest": {
      "tsconfig": {
        "allowJs": true
      }
    }
  },*/
  transform: {
    "^.+\\.(ts|tsx|js)$": ["ts-jest",{ diagnostics: false}],
  },
  transformIgnorePatterns: [
      "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
    ],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom", "./jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/","<rootDir>/tests-e2e/"]
}

/** @type {import('ts-jest').JestConfigWithTsJest} **/
/*module.exports = {
  preset: 'ts-jest',
  extensionsToTreatAsEsm: [".ts"],
  testEnvironment: "jest-fixed-jsdom",
  /*globals: {
    "ts-jest": {
      "tsconfig": {
        "allowJs": true
      }
    }
  },
  transform: {
    "^.+\\.(ts|tsx|js)$": ["ts-jest",{ diagnostics: false}],
  },
  transformIgnorePatterns: [
      "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
    ],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom", "./jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/","<rootDir>/tests-e2e/"]
};*/

export default createJestConfig(config)