const path = require("path")

const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
    stories: ["../app/**/*stories.tsx"],
    addons: [
        "storybook-addon-performance/register",
        "@storybook/addon-a11y",
        "@storybook/addon-toolbars",
    ],
    typescript: {
        reactDocgen: false,
    },
    webpackFinal: async (config) => {
        return {
            ...config,
            stats: "errors-only",
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    "@emotion/core": toPath("node_modules/@emotion/react"),
                    "emotion-theming": toPath("node_modules/@emotion/react"),
                },
            },
        }
    },
}
