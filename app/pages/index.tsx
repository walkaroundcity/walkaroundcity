import { Box } from "app/core/components/Box"
import { ButtonLogIn, ButtonLogOut } from "app/core/components/Button"
import { Container } from "app/core/components/Container"
import { Heading } from "app/core/components/Heading"
import { Stack } from "app/core/components/Orientation"
import { Text } from "app/core/components/Text"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { AppLayout } from "app/core/layouts/AppLayout"
import { BlitzPage, GetStaticPropsContext } from "blitz"
import { useTranslations } from "next-intl"
import React from "react"

const Home: BlitzPage = () => {
    const currentUser = useCurrentUser()
    const t = useTranslations()

    return (
        <Container maxW={"3xl"}>
            <Stack
                as={Box}
                textAlign={"center"}
                spacing={{ base: 8, md: 14 }}
                py={{ base: 20, md: 36 }}
            >
                <Heading fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }} lineHeight={"110%"}>
                    {t("home.greet", {
                        important: (children) => (
                            <Text as={"span"} color={"green.400"}>
                                {children}
                            </Text>
                        ),
                    })}
                </Heading>
                <Text color={"gray.500"}>{t("home.slug")}</Text>
                <Stack
                    direction={"column"}
                    spacing={3}
                    align={"center"}
                    alignSelf={"center"}
                    position={"relative"}
                >
                    {!currentUser && <ButtonLogIn />}
                    {currentUser && <ButtonLogOut />}
                </Stack>
            </Stack>
        </Container>
    )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <AppLayout title="Home">{page}</AppLayout>

export function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: require(`locales/${locale}.json`),
        },
    }
}

export default Home
