var preset = require("jest-preset-angular/jest-preset");

module.exports = {
  ...preset,
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "<rootDir>/node_modules/jest-preset-angular/build/config/setup-jest.js",
  ],
  testRunner: "jest-jasmine2",
  testMatch: ["**/*.spec.ts"],
  modulePaths: ["."],
  globals: {
    ...preset.globals,
    "ts-jest": {
      ...preset.globals["ts-jest"],
      tsConfig: "src/tsconfig.spec.json",
      isolatedModules: true,
    },
  },
};
