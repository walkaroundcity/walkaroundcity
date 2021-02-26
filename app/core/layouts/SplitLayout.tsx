import { SimpleGrid } from "@chakra-ui/react"
import { Box } from "app/core/components/Box"
import { Container } from "app/core/components/Container"
import { Stack } from "app/core/components/Orientation"
import { AppLayout, AppLayoutProps } from "app/core/layouts/AppLayout"
import { ReactNode } from "react"
import React from "react"

type SplitLeftLayoutProps = AppLayoutProps & {
    title?: string
    left: React.FC
    children: ReactNode
}

const SplitLeftLayout: React.FC<SplitLeftLayoutProps> = ({ children, title, left: Left }) => {
    return (
        <AppLayout title={title}>
            <Box position={"relative"}>
                <Container
                    as={SimpleGrid}
                    maxW={"7xl"}
                    columns={{ base: 1, md: 2 }}
                    spacing={{ base: 10, lg: 32 }}
                    py={{ base: 10, sm: 20, lg: 32 }}
                >
                    <Stack spacing={{ base: 10, md: 20 }}>
                        <Left />
                    </Stack>
                    <Stack
                        bg={"gray.50"}
                        rounded={"xl"}
                        p={{ base: 4, sm: 6, md: 8 }}
                        spacing={{ base: 8 }}
                        maxW={{ lg: "lg" }}
                    >
                        {children}
                    </Stack>
                </Container>
            </Box>
        </AppLayout>
    )
}

export default SplitLeftLayout
