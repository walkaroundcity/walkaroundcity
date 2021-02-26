import * as React from "react"

import { IconLogin, IconLogo } from "."

const config = {
    title: "Design System/Icons",
}

export default config

export const login = (): React.ReactElement => <IconLogin />
export const logo = (): React.ReactElement => <IconLogo />
