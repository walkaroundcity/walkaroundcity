import { Footer } from "app/core/components/Footer"
import { HeaderBar } from "app/core/components/HeaderBar"
import { Head } from "blitz"
import React, { ReactNode } from "react"
import { constants } from "utils/config"

export type AppLayoutProps = {
    children: ReactNode
    title?: string
}

export const AppLayout = ({ children, title }: AppLayoutProps) => {
    return (
        <>
            <Head>
                <title>{title || constants.appName}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderBar showNavButton />
            {children}
            <Footer />
        </>
    )
}
