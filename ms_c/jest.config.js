/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/tests/setupTests.ts'],
    moduleNameMapper: {
        'src/(.*)': '<rootDir>/src/$1',
    },
};
