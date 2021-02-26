// eslint-disable-next-line no-restricted-imports
import { Button, ButtonProps, IconButton, IconButtonProps, useColorMode } from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import { useMutation, useRouter } from "blitz"
import { useTranslations } from "next-intl"
import React from "react"
import { constants } from "utils/config"

import { IconBeer, IconBurger, IconMenu, IconMoon, IconSun } from "./Icons"
import { Link } from "./Link"
// eslint-disable-next-line no-restricted-imports
export { Button, IconButton } from "@chakra-ui/react"
// eslint-disable-next-line no-restricted-imports
export type { ButtonProps, IconButtonProps } from "@chakra-ui/react"

export const ButtonLink: React.FC<ButtonProps & { href: string }> = ({
    href,
    children,
    ...props
}) => (
    <Link href={href}>
        <Button
            mt={8}
            w={"full"}
            type="submit"
            _hover={{
                boxShadow: "xl",
            }}
            {...props}
        >
            {children}
        </Button>
    </Link>
)

export const IconButtonLink: React.FC<IconButtonProps & { href: string }> = ({
    href,
    ...props
}) => (
    <Link href={href}>
        <IconButton {...props} />
    </Link>
)

export const ButtonLogIn: React.FC<{}> = () => {
    const t = useTranslations()

    return (
        <ButtonLink colorScheme="teal" variant="outline" href={constants.routes.login}>
            {t("buttons.login")}
        </ButtonLink>
    )
}

export const ButtonLogOut: React.FC<{}> = () => {
    const [logoutMutation] = useMutation(logout)
    const t = useTranslations()
    const router = useRouter()

    return (
        <Button
            onClick={async () => {
                await logoutMutation()
                await router.push(constants.routes.home)
            }}
        >
            {t("buttons.logout")}
        </Button>
    )
}

export const ButtonLanguageToggle: React.FC<{}> = () => {
    const router = useRouter()
    const t = useTranslations()

    return (
        <IconButton
            size={"sm"}
            variant={"ghost"}
            aria-label={t("buttons.language") as string}
            onClick={() => {
                router.push(router.route, router.route, {
                    locale: router.locale === "de" ? "en" : "de",
                })
            }}
            icon={router.locale === "de" ? <IconBurger h={18} /> : <IconBeer h={18} />}
        />
    )
}

export const ButtonColorToggle: React.FC<{}> = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const t = useTranslations()

    return (
        <IconButton
            size={"sm"}
            variant={"ghost"}
            aria-label={t("buttons.colorMode") as string}
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <IconMoon h={18} /> : <IconSun h={18} />}
        />
    )
}

export const ButtonNavigationToggle: React.FC<{}> = () => {
    const t = useTranslations()

    return (
        <IconButton
            size={"sm"}
            variant={"ghost"}
            aria-label={t("buttons.navigation") as string}
            icon={<IconMenu h={18} />}
        />
    )
}
