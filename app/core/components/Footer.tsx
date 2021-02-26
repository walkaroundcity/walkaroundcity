import { useColorModeValue } from "@chakra-ui/react"
import { useTranslations } from "next-intl"
import React from "react"

import { Box } from "./Box"
import { Container } from "./Container"
import { Link } from "./Link"
import { Stack } from "./Orientation"
import { Text } from "./Text"

export const Footer = () => {
    const t = useTranslations()
    return (
        <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            color={"gray.500"}
            py={{ base: 4, sm: 8 }}
        >
            <Container as={Stack} spacing={6} maxW={"7xl"}>
                <Stack
                    direction={{ base: "column", sm: "row" }}
                    justify={"space-between"}
                    as={"nav"}
                    spacing={3}
                >
                    {"lala"}
                </Stack>
                <Stack direction={{ base: "column", md: "row" }} justify={"space-between"}>
                    <Text>
                        {t("footer")} <Link href={"https://jonas-strassel.de"}>Jonas Strassel</Link>
                    </Text>
                </Stack>
            </Container>
        </Box>
    )
}
