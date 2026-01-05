/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/tests/__mocks__/fileMock.js',
        '^../utils/imagePath$': '<rootDir>/src/tests/__mocks__/imagePath.js'
    },
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    globals: {
        'import.meta': {
            env: {
                BASE_URL: '/'
            }
        }
    },
    transformIgnorePatterns: [
        'node_modules/(?!(react-dnd|react-dnd-html5-backend|@react-dnd|dnd-core|react-router|react-router-dom|react-datepicker|react-select|rc-slider|@floating-ui|react-tabs)/)'
    ],
    testMatch: [
        '<rootDir>/src/tests/**/*.test.{js,jsx}'
    ],
    moduleFileExtensions: ['js', 'jsx', 'json']
};
