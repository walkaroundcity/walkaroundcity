import * as config from "./config"

describe("config.getBaseUrl", () => {
    test("production", () => {
        process.env.VERCEL_ENV = "production"
        expect(config.getBaseUrl()).toBe(config.constants.baseUrl)
    })
    test("vercel_url in production", () => {
        process.env.VERCEL_ENV = "production"
        process.env.VERCEL_URL = "lala"
        expect(config.getBaseUrl()).toBe(config.constants.baseUrl)
    })

    test("vercel_url in non-production", () => {
        process.env.VERCEL_ENV = "preview"
        process.env.VERCEL_URL = "lala"
        expect(config.getBaseUrl()).toBe("lala")
    })
})
