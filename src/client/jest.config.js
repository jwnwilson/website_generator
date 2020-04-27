module.exports = {
    setupFiles: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.cache/', '<rootDir>/node_modules/'],
    transform: {
        "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
        ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
    },
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|styl|less|sass|scss)$": "identity-obj-proxy"
    },
    setupFiles: [`<rootDir>/loadershim.js`],
}