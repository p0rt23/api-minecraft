// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['routes/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text'],
  testEnvironment: 'node'
}
