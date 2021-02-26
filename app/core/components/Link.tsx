// eslint-disable-next-line no-restricted-imports
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react"
// eslint-disable-next-line no-restricted-imports
import { Link as BlitzLink, LinkProps as BlitzLinkProps } from "blitz"

export const Link: React.FC<ChakraLinkProps & BlitzLinkProps> = ({ children, href, ...props }) => {
    return (
        <BlitzLink href={href}>
            <ChakraLink {...props} as="span">
                {children}
            </ChakraLink>
        </BlitzLink>
    )
}
