/* eslint-disable no-restricted-imports */
import { Icon, IconProps } from "@chakra-ui/react"
import React from "react"
import { GiBeerStein, GiHamburger } from "react-icons/gi"
import {
    IoAlert,
    IoCamera,
    IoKey,
    IoLogIn,
    IoLogoDropbox,
    IoLogoFacebook,
    IoLogoGithub,
    IoLogoGoogle,
    IoLogoTwitter,
    IoLogOut,
    IoLogoWindows,
    IoMenu,
    IoMoon,
    IoSunny,
} from "react-icons/io5"
import { IconType } from "react-icons/lib"
import { SiAdobe } from "react-icons/si"

/**
 * this file is meant as an adapter to curate the icons we want from the react icons pkg
 * react icons include practically all icon sets available: https://react-icons.github.io/react-icons/
 * they need to get curated to avoid duplication and thus inconsistency
 * use "Icon" as a prefix for better IDE support
 * lets try to stick with one icon set as the default. I'd propose ion icons5
 * https://react-icons.github.io/react-icons/icons?name=io5
 */
const AsIcon: React.FC<IconProps & { icon: IconType }> = ({ icon, ...props }) => {
    return <Icon as={icon} {...props} />
}

export const IconLogin = (props: IconProps) => <AsIcon icon={IoLogIn} {...props} />
export const IconLogout = (props: IconProps) => <AsIcon icon={IoLogOut} {...props} />
export const IconKey = (props: IconProps) => <AsIcon icon={IoKey} {...props} />
export const IconLogo = (props: IconProps) => <AsIcon icon={IoCamera} {...props} />
export const IconMoon = (props: IconProps) => <AsIcon icon={IoMoon} {...props} />
export const IconSun = (props: IconProps) => <AsIcon icon={IoSunny} {...props} />
export const IconMenu = (props: IconProps) => <AsIcon icon={IoMenu} {...props} />
export const IconAlert = (props: IconProps) => <AsIcon icon={IoAlert} {...props} />
export const IconBeer = (props: IconProps) => <AsIcon icon={GiBeerStein} {...props} />
export const IconBurger = (props: IconProps) => <AsIcon icon={GiHamburger} {...props} />
export const IconTwitter = (props: IconProps) => <AsIcon icon={IoLogoTwitter} {...props} />
export const IconGoogle = (props: IconProps) => <AsIcon icon={IoLogoGoogle} {...props} />
export const IconFacebook = (props: IconProps) => <AsIcon icon={IoLogoFacebook} {...props} />
export const IconMicrosoft = (props: IconProps) => <AsIcon icon={IoLogoWindows} {...props} />
export const IconDropbox = (props: IconProps) => <AsIcon icon={IoLogoDropbox} {...props} />
export const IconAdobe = (props: IconProps) => <AsIcon icon={SiAdobe} {...props} />
export const IconGithub = (props: IconProps) => <AsIcon icon={IoLogoGithub} {...props} />
