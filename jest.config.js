module.exports = {
    roots: [
        "<rootDir>/src"
    ],
    transform: {
        "^.+\\.(ts?|tsx?)$": "ts-jest",
    },
    testRegex: "(/src/.*\\.(test|spec))\\.(ts?|jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};