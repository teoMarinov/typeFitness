import { AbsoluteCenter, Center, Flex, List, Box, Spacer } from "@chakra-ui/react"
import { BiHomeAlt } from "react-icons/bi"
import { CiDumbbell } from "react-icons/ci"
import { GiChickenLeg } from "react-icons/gi"
import { CgProfile } from "react-icons/cg"
import ListItems from "./ListItems"

const NavBar = () => {
    return (
        <Flex >
            <Center minHeight={'60vh'}>
                <List color='white' spacing={'50%'}>
                    <ListItems pathTo="/" icon={BiHomeAlt} text="Home" />
                    <ListItems pathTo="/workouts" icon={CiDumbbell} text="Workouts" />
                    <ListItems pathTo="/nutrition" icon={GiChickenLeg} text="Nutrition" />
                    <ListItems pathTo="/profile" icon={CgProfile} text="Profile" />
                </List>
            </Center>
        </Flex>
    )
}
export default NavBar