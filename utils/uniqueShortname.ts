import {
    adjectives,
    animals,
    colors,
    NumberDictionary,
    uniqueNamesGenerator,
} from "unique-names-generator"

export const shortName = (): string => {
    const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 })

    return uniqueNamesGenerator({
        dictionaries: [colors, adjectives, animals, numberDictionary],
        separator: "-",
    })
}
