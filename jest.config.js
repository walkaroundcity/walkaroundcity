const { pathsToModuleNameMapper } = require("ts-jest/utils")
const { compilerOptions } = require("./tsconfig.json")

const common = {
    // Add type checking to TypeScript test files
    preset: "blitz",
    moduleNameMapper: {
        // This ensures any path aliases in tsconfig also work in jest
        ...pathsToModuleNameMapper(compilerOptions.paths || {}),
    },
}

module.exports = common
