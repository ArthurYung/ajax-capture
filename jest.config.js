module.exports = {
  preset: "ts-jest",
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"]
};
