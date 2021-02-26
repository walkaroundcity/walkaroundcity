import { useColorModeValue } from "@chakra-ui/react"
import { useViewportScroll } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

import { Box } from "./Box"
import { ButtonColorToggle, ButtonLanguageToggle, ButtonNavigationToggle } from "./Button"
import { Container } from "./Container"
import { Heading } from "./Heading"
import { IconLogo } from "./Icons"
import { Link } from "./Link"
import { Stack } from "./Orientation"
import { TextUnderline } from "./TextUnderline"

interface HeaderBarProps {
    showBorder?: boolean
    showNavButton?: boolean
}

export const HeaderBar = ({ showBorder = true }: HeaderBarProps) => {
    const { scrollY } = useViewportScroll()
    const [y, setY] = useState(0)
    const ref = useRef<HTMLHeadingElement>(null)
    const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

    useEffect(() => {
        return scrollY.onChange(() => setY(scrollY.get()))
    }, [scrollY])

    const borderColor = useColorModeValue("gray.100", "gray.900")

    return (
        <Box
            as={"header"}
            ref={ref}
            shadow={y > height ? "lg" : undefined}
            transition="box-shadow 0.2s"
            pos="fixed"
            top="0"
            zIndex="999"
            left="0"
            right="0"
            width="full"
            bg={useColorModeValue("white", "gray.800")}
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={showBorder && y < height ? borderColor : "transparent"}
        >
            <Stack
                as={Container}
                maxW={"7xl"}
                py={4}
                direction={"row"}
                spacing={4}
                justify={"space-between"}
                align={"center"}
            >
                <Link href={"/"}>
                    <Stack
                        as={"a"}
                        direction={"row"}
                        alignItems={"center"}
                        spacing={{ base: 2, sm: 4 }}
                    >
                        <IconLogo />
                        <Heading as={"h1"} fontSize={{ base: "sm", md: "xl" }}>
                            <TextUnderline>walkaround</TextUnderline>.city
                        </Heading>
                    </Stack>
                </Link>
                <Stack direction={"row"} spacing={{ base: 2, sm: 4 }} color={"gray.500"}>
                    <ButtonColorToggle />
                    <ButtonLanguageToggle />
                    <ButtonNavigationToggle />
                </Stack>
            </Stack>
        </Box>
    )
}
