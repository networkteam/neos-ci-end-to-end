import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testMatch: "DistributionPackages/**/*.spec.ts",
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:8081",
    trace: "on-first-retry",
  },
  // Enable retries for CI and to capture videos, but not for local development
  retries: process.env.CI ? 2 : undefined,
  // Enable list reporter for CI (defaults to dot) and junit for GitLab CI
  reporter: process.env.CI
    ? [["list"], ["junit", { outputFile: "test-results/report.xml" }]]
    : "list",
};

export default config;
