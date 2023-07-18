module.exports = {
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/__tests__/utils/setupTests.ts'],
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '!**/__tests__/utils/**',
  ],
};
