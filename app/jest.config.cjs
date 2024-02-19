module.exports = {
    
    testMatch: ["<rootDir>/tests/**/*.test.jsx"],
    
    setupFilesAfterEnv: ["<rootDir>/tests/setupTests.jsx"],

    testEnvironment: 'jest-environment-jsdom'

  };
  