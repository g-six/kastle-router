module.exports = {
  clearMocks: true,
  coverageDirectory: '../coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  coveragePathIgnorePatterns: ['config.ts', 'mocks.ts'],
  preset: 'ts-jest',
  rootDir: './src',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  verbose: true,
}
