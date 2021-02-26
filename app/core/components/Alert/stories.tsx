import * as React from "react"

import { IconAlert } from "../Icons"
import { Alert } from "."

const config = {
    title: "Design System/Alert",
}

export default config

export const error = (): React.ReactElement => (
    <Alert status="error">
        <IconAlert />
        "BE AFRAID"
    </Alert>
)
