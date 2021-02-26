import { Box } from "app/core/components/Box"
import { ButtonLogOut } from "app/core/components/Button"
import { Code } from "app/core/components/Code"
import { Container } from "app/core/components/Container"
import { Heading } from "app/core/components/Heading"
import { Stack, StackDivider, VStack } from "app/core/components/Orientation"
import { Text } from "app/core/components/Text"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { AppLayout } from "app/core/layouts/AppLayout"
import { BlitzPage, GetStaticPropsContext, Image } from "blitz"
import { useTranslations } from "next-intl"
import React from "react"

const Dashboard: BlitzPage = () => {
    const currentUser = useCurrentUser()
    const t = useTranslations()

    return (
        <AppLayout>
            <Container maxW={"3xl"}>
                <Stack
                    as={Box}
                    textAlign={"center"}
                    spacing={{ base: 8, md: 14 }}
                    py={{ base: 20, md: 36 }}
                >
                    <Heading fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }} lineHeight={"110%"}>
                        {t("dashboard.greet", {
                            important: (children) => (
                                <Text as={"span"} color={"green.400"}>
                                    {children}
                                </Text>
                            ),
                        })}
                    </Heading>
                    <Stack
                        direction={"column"}
                        spacing={3}
                        align={"center"}
                        alignSelf={"center"}
                        position={"relative"}
                    >
                        {currentUser && (
                            <VStack
                                divider={<StackDivider borderColor="gray.200" />}
                                spacing={4}
                                align="stretch"
                            >
                                <Box>
                                    <Text>
                                        User id: <Code>{currentUser.id}</Code>
                                    </Text>
                                </Box>
                                <Box>
                                    <Text>
                                        User email: <Code>{currentUser.email}</Code>
                                    </Text>
                                </Box>
                                <Box>
                                    <Text>
                                        User role: <Code>{currentUser.role}</Code>
                                    </Text>
                                </Box>
                                {currentUser.profile_picture && (
                                    <Box>
                                        <Text>Picture:</Text>
                                        <Image
                                            width={50}
                                            height={50}
                                            src={currentUser.profile_picture}
                                        />
                                    </Box>
                                )}
                            </VStack>
                        )}
                        {currentUser && <ButtonLogOut />}
                    </Stack>
                </Stack>
            </Container>
        </AppLayout>
    )
}

export function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: require(`locales/${locale}.json`),
        },
    }
}

export default Dashboard
