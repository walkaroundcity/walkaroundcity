import { LoginForm } from "app/auth/components/LoginForm"
import { Box } from "app/core/components/Box"
import { IconButtonLink } from "app/core/components/Button"
import { Heading } from "app/core/components/Heading"
import { IconDropbox, IconFacebook, IconGoogle, IconTwitter } from "app/core/components/Icons"
import { Center, HStack, Stack, VStack } from "app/core/components/Orientation"
import { Text } from "app/core/components/Text"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import SplitLeftLayout from "app/core/layouts/SplitLayout"
import { BlitzPage, GetStaticPropsContext, useRouter } from "blitz"
import { useTranslations } from "next-intl"
import React from "react"
import { constants } from "utils/config"

const Left: React.FC<{}> = () => {
    const t = useTranslations()
    return (
        <Heading lineHeight={1.1} fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}>
            {t("login.greet", {
                important: (children) => {
                    return (
                        <Text as={"span"} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                            {children}
                        </Text>
                    )
                },
            })}
        </Heading>
    )
}

const LoginPage: BlitzPage = () => {
    const router = useRouter()
    const currentUser = useCurrentUser()
    const t = useTranslations()

    if (currentUser) {
        router.push(constants.routes.dashboard)
        return <>already logged in</>
    }

    return (
        <SplitLeftLayout title={t("login.title") as string} left={Left}>
            <Stack spacing={4}>
                <Heading
                    color={"gray.800"}
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                >
                    {t("login.heading")}
                </Heading>

                <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                    {t("login.description")}
                </Text>
            </Stack>
            <Box mt={10}>
                <Stack spacing={4}>
                    <LoginForm onSuccess={() => router.push(constants.routes.home)} />
                    <Center>
                        <VStack>
                            <Heading
                                lineHeight={1.1}
                                fontSize={{ base: "1xl", sm: "1xl", md: "2xl", lg: "3xl" }}
                            >
                                <Text
                                    as={"span"}
                                    bgGradient="linear(to-r, red.400,pink.400)"
                                    bgClip="text"
                                >
                                    {t("login.ssoOr")}
                                </Text>
                            </Heading>
                            <HStack>
                                <IconButtonLink
                                    aria-label={t("login.sso", { provider: "Twitter" }) as string}
                                    href={constants.routes.twitterAuth}
                                    icon={<IconTwitter />}
                                />
                                <IconButtonLink
                                    aria-label={t("login.sso", { provider: "Google" }) as string}
                                    href={constants.routes.googleAuth}
                                    icon={<IconGoogle />}
                                />
                                <IconButtonLink
                                    aria-label={t("login.sso", { provider: "Facebook" }) as string}
                                    href={constants.routes.facebookAuth}
                                    icon={<IconFacebook />}
                                />
                                <IconButtonLink
                                    aria-label={t("login.sso", { provider: "Dropbox" }) as string}
                                    href={constants.routes.dropboxAuth}
                                    icon={<IconDropbox />}
                                />
                            </HStack>
                        </VStack>
                    </Center>
                </Stack>
            </Box>
        </SplitLeftLayout>
    )
}

export function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: require(`locales/${locale}.json`),
        },
    }
}

export default LoginPage
